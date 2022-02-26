import React from 'react'

const usePagination = (count: number | null, limit: number, page: number, pagesRange: number | null = 1) => {
    const [slicedPages, setSlicedPages] = React.useState<Array<number | string>>([]);

    React.useEffect(() => {
        if(page && limit && count && pagesRange) {
            const arrayOfPages = splitOnArrayOfPages(limit, count);
            setSlicedPages(slicePagesByCurrentPage(arrayOfPages, page, pagesRange));
        }
    }, [page, limit, count]);

    function splitOnArrayOfPages(limit: number, count: number) {
        const arrOfIndexes = [];
        const pagesCount = Math.ceil(count / limit);  
        for(let i = 1; i < pagesCount + 1; i++) {
          arrOfIndexes.push(i);
        }
        return arrOfIndexes
    }

    function slicePagesByCurrentPage(pages: Array<string | number | any>, currentPage: number, pagesRange: number) {
        const currentPageIndex = pages.indexOf(currentPage);
        let rangedPages = [];
        if(currentPageIndex - pagesRange < 0) {
           rangedPages = pages.slice(0, currentPageIndex).concat(pages.slice(currentPageIndex, currentPageIndex + pagesRange + 1))
        } else {
           rangedPages = pages.slice(currentPageIndex - pagesRange, currentPageIndex).concat(pages.slice(currentPageIndex, currentPageIndex + pagesRange + 1))
        }
        if(!rangedPages.includes(1)) {
          rangedPages = [pages[0]].concat([...rangedPages])
        }
        if(!rangedPages.includes(pages[pages.length - 1])) {
          rangedPages = [...rangedPages, pages[pages.length - 1]]
        }
        if(rangedPages[1] - rangedPages[0] > 1) {
          const firstEl = rangedPages[0];
          rangedPages = rangedPages.slice(1)
          rangedPages = [firstEl, "...", ...rangedPages];
        }
        if(rangedPages[rangedPages.length - 1] - rangedPages[rangedPages.length - 2] > 1) {
          const lastEl = rangedPages[rangedPages.length - 1];
          rangedPages = rangedPages.slice(0,rangedPages.length - 1);
          rangedPages = [...rangedPages, "...", lastEl];
        }
        return rangedPages;
      }
    
    return slicedPages ? [slicedPages] : [null]
}

export default usePagination;