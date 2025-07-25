import { useDispatch as useDis, useSelector as useSel } from "react-redux";
import type { RootStoreType, AppDispatch } from "./store";

export const useDispatch = useDis.withTypes<AppDispatch>();
export const useSelector = useSel.withTypes<RootStoreType>();
