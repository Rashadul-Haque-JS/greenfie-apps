import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

//Varje export blir en variant av komponenten -> visas i menyn till vänster i Storybook
export const Login = Template.bind({});
export const Register = Template.bind({});
//I detta objekt anges vilka props komponenten ska renderas med
Login.args = {mode:'primary', children: 'Log In',  };
Register.args = {mode:'others', children: 'Register' };