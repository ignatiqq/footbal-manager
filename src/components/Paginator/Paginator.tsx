import React from 'react';

interface IPaginator {
    count: number
}

const Paginator: React.FC<IPaginator> = ({count}) => {
    const [pagesCount, setPagesCount] = React.useState<number>();

    return (
        <div>Paginator</div>
    )
}

export default Paginator