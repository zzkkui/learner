import {
  HttpMethod,
  Param,
  Parse,
  ControllerType,
  RouteType,
  ParamType,
  ParseType,
} from 'utils';

// 维护全局变量用来收集依赖，这里是通过 es7 的装饰器来注入依赖
export const controllerList: ControllerType[] = [];
export const routeList: RouteType[] = [];
export const paramList: ParamType[] = [];
export const parseList: ParseType[] = [];

// 类装饰器收集器
export function Controller(path = '') {
  return (target) => {
    controllerList.push({ path, target });
  };
}

// 路由装饰器收集器
export function createMethodDecorator(method: HttpMethod = 'get') {
  return (path = '/'): MethodDecorator =>
    // target：当前类实例，name：当前函数名，descriptor：当前属性（函数）的描述符
    (target: object, name: string, descriptor: any) => {
      routeList.push({
        target,
        type: method,
        path,
        name,
        func: descriptor.value,
      });
    };
}

// 参数装饰器收集器
export function createParamDecorator(type: Param) {
  return (key?: string): ParameterDecorator =>
    // target：当前类实例，name：当前函数名，index：当前函数参数顺序
    (target: object, name: string, index: number) => {
      paramList.push({ key, index, type, name });
    };
}

// 参数类型装饰器收集器
export function Parse(type: Parse): ParameterDecorator {
  return (target: object, name: string, index: number) => {
    parseList.push({ type, index, name });
  };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Body = createParamDecorator('body');
export const Headers = createParamDecorator('headers');
export const Cookies = createParamDecorator('cookies');
export const Query = createParamDecorator('query');
