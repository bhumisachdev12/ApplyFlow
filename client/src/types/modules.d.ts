// Module declarations for better TypeScript support during development

declare module 'react' {
  export interface Component<P = {}, S = {}, SS = any> {}
  export interface PureComponent<P = {}, S = {}, SS = any> {}
  export interface FC<P = {}> {
    (props: P): JSX.Element | null;
  }
  export interface ComponentType<P = {}> {
    (props: P): JSX.Element | null;
  }
  
  export type ReactNode = JSX.Element | string | number | boolean | null | undefined | ReactNode[];
  export type MouseEvent<T = Element> = Event & { target: T; currentTarget: T; stopPropagation(): void; preventDefault(): void; };
  export type ChangeEvent<T = Element> = Event & { target: T; currentTarget: T; };
  export type FormEvent<T = Element> = Event & { target: T; currentTarget: T; preventDefault(): void; };
  
  export interface Context<T> {
    Provider: React.ComponentType<{ value: T; children?: ReactNode }>;
    Consumer: React.ComponentType<{ children: (value: T) => ReactNode }>;
  }
  
  export interface CSSProperties {
    [key: string]: any;
  }
  
  export interface HTMLAttributes<T> {
    className?: string;
    style?: CSSProperties;
    onClick?: (event: MouseEvent<T>) => void;
    onChange?: (event: ChangeEvent<T>) => void;
    onSubmit?: (event: FormEvent<T>) => void;
    [key: string]: any;
  }
  
  export interface SVGProps<T> extends HTMLAttributes<T> {
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    fill?: string;
    stroke?: string;
  }
  
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useContext<T>(context: Context<T>): T;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function createElement(type: any, props?: any, ...children: any[]): JSX.Element;
  
  export const Fragment: ComponentType<{ children?: ReactNode }>;
  
  const React: {
    FC: <P = {}>(component: (props: P) => JSX.Element | null) => FC<P>;
    Component: typeof Component;
    PureComponent: typeof PureComponent;
    useState: typeof useState;
    useEffect: typeof useEffect;
    useContext: typeof useContext;
    createContext: typeof createContext;
    createElement: typeof createElement;
    Fragment: typeof Fragment;
  };
  
  export default React;
}

declare module 'react-dom' {
  import * as ReactDOM from 'react-dom';
  export = ReactDOM;
  export as namespace ReactDOM;
}

declare module 'react-beautiful-dnd' {
  export interface DraggableProvided {
    innerRef: (element?: HTMLElement | null) => void;
    draggableProps: any;
    dragHandleProps: any;
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
    dropAnimation?: any;
    draggingOver?: string;
    combineWith?: string;
    combineTargetFor?: string;
    mode?: string;
  }

  export interface DroppableProvided {
    innerRef: (element?: HTMLElement | null) => void;
    droppableProps: any;
    placeholder?: React.ReactElement<any> | null;
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith?: string;
    draggingFromThisWith?: string;
    isUsingPlaceholder: boolean;
  }

  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      droppableId: string;
      index: number;
    };
    destination?: {
      droppableId: string;
      index: number;
    } | null;
    reason: string;
    mode: string;
    combine?: any;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: DropResult) => void;
    onDragStart?: (start: any) => void;
    onDragUpdate?: (update: any) => void;
    children: React.ReactNode;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactElement<any>;
    isDragDisabled?: boolean;
    disableInteractiveElementBlocking?: boolean;
    shouldRespectForcePress?: boolean;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactElement<any>;
    type?: string;
    mode?: string;
    isDropDisabled?: boolean;
    isCombineEnabled?: boolean;
    direction?: string;
    ignoreContainerClipping?: boolean;
    renderClone?: any;
    getContainerForClone?: any;
  }

  export const DragDropContext: React.ComponentType<DragDropContextProps>;
  export const Draggable: React.ComponentType<DraggableProps>;
  export const Droppable: React.ComponentType<DroppableProps>;
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export const Calendar: FC<LucideProps>;
  export const ExternalLink: FC<LucideProps>;
  export const MapPin: FC<LucideProps>;
  export const Edit: FC<LucideProps>;
  export const Trash2: FC<LucideProps>;
  export const Plus: FC<LucideProps>;
  export const Search: FC<LucideProps>;
  export const Filter: FC<LucideProps>;
  export const LogOut: FC<LucideProps>;
  export const BarChart3: FC<LucideProps>;
  export const Kanban: FC<LucideProps>;
  export const Home: FC<LucideProps>;
  export const TrendingUp: FC<LucideProps>;
  export const Target: FC<LucideProps>;
  export const Clock: FC<LucideProps>;
  export const Award: FC<LucideProps>;
  export const CheckCircle: FC<LucideProps>;
  export const Eye: FC<LucideProps>;
  export const EyeOff: FC<LucideProps>;
  export const Mail: FC<LucideProps>;
  export const Lock: FC<LucideProps>;
  export const User: FC<LucideProps>;
  export const X: FC<LucideProps>;
}

declare module 'react-hot-toast' {
  export interface ToastOptions {
    duration?: number;
    position?: string;
    style?: React.CSSProperties;
    className?: string;
    icon?: React.ReactNode;
    iconTheme?: {
      primary: string;
      secondary: string;
    };
    ariaProps?: {
      role: string;
      'aria-live': string;
    };
  }

  export interface ToasterProps {
    position?: string;
    toastOptions?: {
      duration?: number;
      style?: React.CSSProperties;
      success?: ToastOptions;
      error?: ToastOptions;
    };
    reverseOrder?: boolean;
    gutter?: number;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
  }

  export function toast(message: string, options?: ToastOptions): string;
  export namespace toast {
    function success(message: string, options?: ToastOptions): string;
    function error(message: string, options?: ToastOptions): string;
    function loading(message: string, options?: ToastOptions): string;
    function dismiss(toastId?: string): void;
  }

  export const Toaster: React.ComponentType<ToasterProps>;
  export default toast;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    headers?: any;
    params?: any;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
  }

  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
  }

  export interface AxiosError {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse;
    isAxiosError: boolean;
  }

  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: {
      request: any;
      response: any;
    };
    create?: (config?: AxiosRequestConfig) => AxiosInstance;
  }

  export function create(config?: AxiosRequestConfig): AxiosInstance;
  
  const axios: AxiosInstance & {
    create: (config?: AxiosRequestConfig) => AxiosInstance;
  };
  export default axios;
}

declare module 'chart.js' {
  export const Chart: any;
  export const CategoryScale: any;
  export const LinearScale: any;
  export const BarElement: any;
  export const Title: any;
  export const Tooltip: any;
  export const Legend: any;
  export const ArcElement: any;
}

declare module 'react-chartjs-2' {
  import { ComponentType } from 'react';
  
  export interface ChartProps {
    data: any;
    options?: any;
    plugins?: any[];
    width?: number;
    height?: number;
  }

  export const Bar: ComponentType<ChartProps>;
  export const Doughnut: ComponentType<ChartProps>;
  export const Line: ComponentType<ChartProps>;
  export const Pie: ComponentType<ChartProps>;
}

declare module 'clsx' {
  export default function clsx(...args: any[]): string;
}