import { Controller, Get, Query, Post, Body, Parse } from '../decorators';

// 这里会优先运行文件，进行依赖的收集
@Controller()
export default class Index {
  @Get('/')
  index(@Parse('number') @Query('id') id: number) {
    return { code: 200, id, message: 'success' };
  }

  @Post('/login')
  login(
    // @Body() body: { name: string; password: string },
    @Body('name') name: string,
    @Body('password') psd: string,
  ) {
    // console.log(body);
    if (name !== 'zzkkui' || psd !== '123') {
      return { code: 401, message: 'auth failed' };
    }
    const token = `t:${name}_${psd.slice(0, 1)}_${Math.random().toFixed(2)}`;
    return { code: 200, token, message: 'success' };
  }
}
