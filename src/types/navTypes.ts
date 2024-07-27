import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RouterNames } from '../routerNames';

export type ListParams = { [RouterNames.LIST]: undefined };
export type SettingsParams = { [RouterNames.SETTINGS]: undefined };
export type RecentParams = { [RouterNames.RECENT]: undefined };

export type DrawerParams = {
  [RouterNames.LIST]: undefined;
  [RouterNames.RECENT]: undefined;
  [RouterNames.SETTINGS]: undefined;
};

export type ListNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ListParams, RouterNames.LIST>,
  DrawerNavigationProp<DrawerParams, RouterNames.LIST>
>;

export type RecentNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RecentParams, RouterNames.RECENT>,
  DrawerNavigationProp<DrawerParams, RouterNames.RECENT>
>;

export type SettingsNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<SettingsParams, RouterNames.SETTINGS>,
  DrawerNavigationProp<DrawerParams, RouterNames.SETTINGS>
>;
