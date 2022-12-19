type PaginationItem = {
  label: number | string;
  page: number;
};

const createPagination = (
  current: number,
  total: number,
  gap = "..."
): PaginationItem[] => {
  const createButton = (page: number, label?: string) => {
    return {
      label: page ?? label,
      page: page,
    };
  };

  if (total <= 1) return [createButton(1)];

  const center = [current - 2, current - 1, current, current + 1, current + 2];
  const filteredCenter = center
    .filter((page) => page > 1 && page < total)
    .map((item) => createButton(item));
  const includeThreeLeft = current === 5;
  const includeThreeRight = current === total - 4;
  const includeLeftDots = current > 5;
  const includeRightDots = current < total - 4;

  if (includeThreeLeft) filteredCenter.unshift(createButton(2));
  if (includeThreeRight) filteredCenter.push(createButton(total - 1));
  if (includeLeftDots) {
    filteredCenter.unshift(createButton(Math.floor(current / 2), "..."));
  }
  if (includeRightDots) {
    filteredCenter.push(
      createButton(current + Math.floor((total - current) / 2), "...")
    );
  }

  return [createButton(1), ...filteredCenter, createButton(total)];
};

export default createPagination;
