export class MenuList {
  constructor(public name: string, public route: string, public toolTip: string, public icon: string = '',
              public admin: boolean = false, public callFunction: Function) {
  }
}


//@formatter:off
export const menuList2 = [
  new MenuList('Logout', 'logout', '', 'logout', false,null),
];
/* beautify preserve:end */
