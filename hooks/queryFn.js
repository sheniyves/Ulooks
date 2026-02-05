import { useMutation, useQuery } from "@tanstack/react-query";

export const useMutationFn = ({ fun, key, onSuccess, onError }) => {
  const mutation = useMutation({
    mutationKey: key ? [key] : undefined,
    mutationFn: async (payload) => await fun(payload),
    onSuccess,
    onError,
  });

  return mutation;
};

export const useQueryFn = ({
  fun,
  key,
  params,
  enabled = true,
  onSuccess,
  onError,
}) => {
  const query = useQuery({
    queryKey: key ? [key, params] : undefined, 
    queryFn: async () => await fun(params),
    enabled, 
    onSuccess,
    onError,
  });

  return query;
};

