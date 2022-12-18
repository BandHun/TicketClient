export class MenuList {
  constructor(public name: string, public route: string, public toolTip: string, public icon: string = '',
              public admin: boolean = false, public callFunction: Function) {
  }
}


//@formatter:off
export const menuList = [
  new MenuList('Home', 'home', 'Home page', 'home icon', false,null),
  new MenuList('Users', 'users', '', 'account_circle', false,null),
  new MenuList('Teams', 'teams', '', 'flash_on', true,null),
  new MenuList('Hours', 'hours', '', 'hourglass_empty_icon', false,null),
  new MenuList('Team Tables', 'teamtables', '', 'dashboard icon', false,null),
  new MenuList('Projects', 'projects', '', 'poll', true,null),
  new MenuList('Tickets','tickets', '', 'calendar_today', false,null),
  new MenuList('Createticket', 'createticket', '', 'add', false,null),
];
/* beautify preserve:end */
