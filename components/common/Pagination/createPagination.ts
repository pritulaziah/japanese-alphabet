type PaginationItem = {
  label: number | string;
  page: number;
};

const createPagination = (
  current: number,
  total: number,
  gap = "...",
  delta = 7
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
  const includeLeftGap = current > 3 + delta;
  const includeLeftPages = current === 3 + delta;
  const includeRightGap = current < total - (2 + delta);
  const includeRightPages = current === total - (2 + delta);

  if (includeLeftPages) filteredCenter.unshift(createButton(2));
  if (includeRightPages) filteredCenter.push(createButton(total - 1));
  if (includeLeftGap) {
    filteredCenter.unshift(createButton(Math.ceil(current / 2), gap));
  }
  if (includeRightGap) {
    filteredCenter.push(
      createButton(current + Math.ceil((total - current) / 2), gap)
    );
  }

  return [createButton(1), ...filteredCenter, createButton(total)];
};

export default createPagination;
