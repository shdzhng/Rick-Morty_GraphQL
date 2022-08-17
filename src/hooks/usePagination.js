const DOTS = '...';

function usePagination({ currentPage, totalPages }) {
  if (totalPages === 1) return [1];

  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const leftCutOffPoint = 2;
  const rightCutOffPoint = totalPages - 2;

  const leftDots = currentPage > leftCutOffPoint ? [DOTS] : [];
  const rightDots = currentPage <= rightCutOffPoint ? [DOTS] : [];
  const endPage = totalPages === 1 ? [] : [totalPages];

  let middleArray = [];
  if (currentPage > leftCutOffPoint && currentPage <= rightCutOffPoint) {
    middleArray = [prevPage, currentPage, nextPage];
  } else {
    let page = currentPage < 3 ? leftCutOffPoint : rightCutOffPoint;

    while (middleArray.length < 2) {
      middleArray.push(page);
      page++;
    }
  }

  return [1, ...leftDots, ...middleArray, ...rightDots, ...endPage];
}

export default usePagination;
