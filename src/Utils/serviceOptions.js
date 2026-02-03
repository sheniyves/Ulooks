const serviceCategory = localStorage.getItem("serviceCategory")
  ? JSON.parse(localStorage.getItem("serviceCategory"))
  : [];

export const serviceOptions = serviceCategory.data?.map((q) => {
  return {
    value: q.id,
    label: q.name,
  };
});