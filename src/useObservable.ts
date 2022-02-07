import { useState } from "react";
import { observable } from "mobx";

export const useObservable = (value: any) => useState(() => observable.box(value))[0];
