import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Link from './Link';

export default {
  title: 'Example/Link',
  component: Link,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

//Varje export blir en variant av komponenten -> visas i menyn till vänster i Storybook
export const Home = Template.bind({});
export const Cart = Template.bind({});
//I detta objekt anges vilka props komponenten ska renderas med
Home.args = {mode:'primary', children: 'Back To Home',  };
Cart.args = {mode:'others', children: 'To Cart' };