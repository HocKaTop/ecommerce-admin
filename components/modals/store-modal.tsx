"use client";

import { useStoreModalStore } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/model";

export const StoreModal = () => {
	const storeModal = useStoreModalStore();

	return (
		<Modal
			title="Create store"
			description="Add a new store to manage product"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			Future Create Store Form
		</Modal>
	);
};