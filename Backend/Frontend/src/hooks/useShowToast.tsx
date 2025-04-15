import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

type ToastStatus = "info" | "warning" | "success" | "error";

const useShowToast = () => {
	const toast = useToast();

	const showToast = useCallback(
		(title: string, description: string, status: ToastStatus) => {
			toast({
				title,
				description,
				status,
				duration: 3000,
				isClosable: true,
			});
		},
		[toast]
	);

	return showToast;
};

export default useShowToast;