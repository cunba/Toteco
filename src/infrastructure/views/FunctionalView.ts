export type FunctionalView<TViewModel> = React.FC<{ vm: TViewModel }>;

export type FunctionalViews<TViewModel, T2ViewModel> = React.FC<{ vm: TViewModel, vm2: T2ViewModel }>