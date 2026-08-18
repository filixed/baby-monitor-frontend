import {create} from 'zustand';

interface AppStore {
    selectedBabyId: string | null;
    setSelectedBabyId: (id: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
            selectedBabyId: null,
            setSelectedBabyId: (id) => set({selectedBabyId: id}),
        }
    )
)