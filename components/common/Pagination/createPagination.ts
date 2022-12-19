type PaginationItem = {
  label: number | string;
  page: number | null;
  active: boolean;
};

const createPagination = (
  current: number,
  total: number,
  gap = "..."
): PaginationItem[] => {
  const createButton = (page: number | string) => {
    const isNum = typeof page === "number";

    return {
      label: page,
      page: isNum ? page : null,
      active: typeof page === "number" ? current === page : false,
    };
  };

  if (total <= 1) return [createButton(1)];

  const center = [current - 2, current - 1, current, current + 1, current + 2];
  const filteredCenter: (number | typeof gap)[] = center.filter(
    (page) => page > 1 && page < total
  );
  const includeThreeLeft = current === 5;
  const includeThreeRight = current === total - 4;
  const includeLeftDots = current > 5;
  const includeRightDots = current < total - 4;

  if (includeThreeLeft) filteredCenter.unshift(2);
  if (includeThreeRight) filteredCenter.push(total - 1);
  if (includeLeftDots) filteredCenter.unshift(gap);
  if (includeRightDots) filteredCenter.push(gap);

  return [
    createButton(1),
    ...filteredCenter.map((item) => createButton(item)),
    createButton(total),
  ];
};

export default createPagination;
