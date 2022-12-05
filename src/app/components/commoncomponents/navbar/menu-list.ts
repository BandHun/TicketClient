export class MenuList {
  constructor(
    public name: string,
    public route: string,
    public toolTip: string,
    public icon: string = '',
    public admin: boolean = false
  ) {
  }
}

export const menuList = [
  new MenuList('Home', 'home', 'Home page', 'storage', false),
  new MenuList('Users', 'users', '', 'flash_on', false),
  new MenuList('Teams', 'teams', '', 'flash_on', false),
  new MenuList('Team Tables', 'teamtables', '', 'flash_on', false),
  new MenuList('Projects', 'projects', '', 'poll', false),
  new MenuList('Tickets', 'tickets', '', 'calendar_today', false),
  new MenuList('Logout', 'Logout', '', 'forward', false),
  new MenuList('Profile', 'profile', '', 'person', false),
  new MenuList('Createticket', 'createticket', '', 'add', false),
];
