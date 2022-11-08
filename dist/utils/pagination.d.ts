declare const buildPagination: (options: {
    limit: string;
    page: number;
}, count: number, data: any[]) => {
    rows: any[];
    current_page: number;
    per_page: number;
    total_pages: number;
    total: number;
    from: number;
    to: number;
};
export default buildPagination;
