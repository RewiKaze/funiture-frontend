import Pagination from "@material-ui/lab/Pagination";

const PageSelect = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination
      count={pageNumbers.length}
      onChange={(_, page) => {
        paginate(page);
      }}
      variant="outlined"
      color="primary"
    />
  );
};
export default PageSelect;
