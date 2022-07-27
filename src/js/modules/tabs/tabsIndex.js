import { Tabs } from "./tabsPlugin.js";
const tabs = new Tabs('tab', {
   isChanged: (tabs) => {
      console.log(tabs);
   },
   // defaultVisibleIndex: 1
});