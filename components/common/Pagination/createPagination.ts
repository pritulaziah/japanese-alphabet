type PaginationItem = {
  label: number | string;
  page: number;
};

const createPagination = (
  current: number,
  total: number,
  gap = "...",
  delta = 3
): PaginationItem[] => {
  const createButton = (page: number, label?: string) => {
    return {
      label: label ?? page,
      page: page,
    };
  };

  if (total <= 1) return [createButton(1)];
  const center = [createButton(current)];
  for (let i = 1; i <= delta; i++) {
    center.unshift(createButton(current - i));
    center.push(createButton(current + i));
  }
  const filteredCenter = center.filter(
    (item) => item.page > 1 && item.page < total
  );
  const includeThreeLeft = current === 3 + delta;
  const includeThreeRight = current === total - (2 + delta);
  const includeLeftDots = current > 3 + delta;
  const includeRightDots = current < total - (2 + delta);

  if (includeThreeLeft) filteredCenter.unshift(createButton(2));
  if (includeThreeRight) filteredCenter.push(createButton(total - 1));
  if (includeLeftDots) {
    filteredCenter.unshift(createButton(Math.ceil(current / 2), gap));
  }
  if (includeRightDots) {
    filteredCenter.push(
      createButton(current + Math.ceil((total - current) / 2), gap)
    );
  }

  return [createButton(1), ...filteredCenter, createButton(total)];
};

export default createPagination;
