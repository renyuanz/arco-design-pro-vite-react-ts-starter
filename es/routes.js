import React from 'react';
import { IconList, IconGift } from '@arco-design/web-react/icon';
export var defaultRoute = 'welcome';
export var routes = [
    {
        name: 'menu.welcome',
        key: 'welcome',
        icon: React.createElement(IconGift, null),
        componentPath: 'welcome',
    },
    {
        name: 'menu.list',
        key: 'list',
        icon: React.createElement(IconList, null),
        children: [
            {
                name: 'menu.list.searchTable',
                key: 'list/search-table',
                componentPath: 'search-table',
            },
        ],
    },
];
