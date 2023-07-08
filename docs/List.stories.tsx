import { ReactElement, Fragment } from "react";
import type { Meta, StoryObj, StoryContext } from "@storybook/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Collapse from "@mui/material/Collapse";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { argChildren, argProps } from "./utils/formatArgs";
import Paper from "@mui/material/Paper";
import { useArgs, useState } from "@storybook/addons";
// Icons
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ImageIcon from "@mui/icons-material/Image";
import HomeIcon from "@mui/icons-material/Home";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof List> = {
  title: "DATA DISPLAY/List",
  component: List,
  parameters: {
    docs: {
      source: { language: "tsx", format: true, type: "dynamic" },
      description: {
        component:
          "The value must be chosen from a predefined set of allowed values.",
      },
      canvas: { sourceState: "shown" },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disablePadding: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "If `true`, vertical padding is removed from the list.",
    },
    dense: {
      control: { type: "boolean" },
      defaultValue: false,
      description:
        "If `true`, compact vertical padding designed for keyboard and mouse input is used for the list and list items. The prop is available to descendant components as the `dense` context.",
    },
    subheader: {
      control: { type: "string" },
      description: "The content of the subheader, normally `ListSubheader`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

interface NavsOptions {
  key: string;
  name: string;
  href: string;
  icon: ReactElement;
  nested?: NavsOptions[];
}

interface NavigationOptions {
  key: string;
  title: string;
  navs: NavsOptions[];
}

const DATA: NavigationOptions[] = [
  {
    key: "OverView",
    title: "Overview",
    navs: [
      {
        key: "OverView_Menu_one_example",
        name: "Menu one example",
        href: "/menuone",
        icon: <HomeIcon />,
      },
      {
        key: "OverView_Menu_two_example",
        name: "Menu two example",
        href: "/menutwo",
        icon: <ImageIcon />,
      },
    ],
  },
  {
    key: "Management",
    title: "Management",
    navs: [
      {
        key: "Management_Menu Label one",
        name: "Menu Label one",
        href: "#",
        icon: <AutoGraphOutlinedIcon />,
        nested: [
          {
            key: "Management_Menu_Label_two",
            name: "Menu Label two",
            href: "/faq",
            icon: <AlignHorizontalCenterIcon fontSize="small" />,
          },
          {
            key: "Management_Menu_Label_2.2",
            name: "Menu Label 2.2",
            href: "/details/about",
            icon: <WorkOutlineIcon fontSize="small" />,
          },
        ],
      },
      {
        key: "Management_Menu_two_Label_one",
        name: "Menu two Label one",
        href: "",
        icon: <BeachAccessIcon />,
        nested: [
          {
            key: "Management_Menu_two_Label_2.1",
            name: "Menu two Label 2.1",
            href: "/details/post",
            icon: <AspectRatioIcon fontSize="small" />,
          },
          {
            key: "Management_Menu_two_Label_2.2",
            name: "Menu two Label 2.2",
            href: "/details/about",
            icon: <AllInclusiveIcon fontSize="small" />,
            nested: [
              {
                key: "Management_Menu_two_Label_3.1",
                name: "Menu two Label 3.1",
                href: "/details/aboutas",
                icon: <AutoAwesomeMotionIcon fontSize="small" />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const NestedNavs = ({ nav, open, setOpen, nested = 2 }: any) => {
  // const router = useRouter();
  return (
    <Fragment key={nav?.key}>
      <ListItemButton
        sx={{
          pl: nested,
        }}
        onClick={() => {
          if (!Boolean(open.includes(nav.key))) {
            setOpen((prevState: any) => [...prevState, nav.key]);
          } else {
            setOpen((prevState: any) =>
              prevState.filter((d: any) => d !== nav.key)
            );
          }
        }}
      >
        <ListItemIcon>{nav?.icon}</ListItemIcon>
        <ListItemText primary={nav?.name} />

        <KeyboardArrowRight
          sx={{
            transform: Boolean(open.includes(nav.key))
              ? "rotate(90deg)"
              : "rotate(0deg)",
            transition: "0.2s",
          }}
        />
      </ListItemButton>
      <Collapse in={Boolean(open.includes(nav.key))}>
        <List disablePadding>
          {nav?.nested?.map((nest: any) => {
            if (!Boolean(nest?.nested)) {
              return (
                <ListItemButton
                  sx={{
                    pl: nested + 1,
                  }}
                  key={nest.key}
                  // onClick={() => router.push(nest.href)}
                >
                  <ListItemIcon>{nest.icon}</ListItemIcon>
                  <ListItemText primary={nest.name} />
                </ListItemButton>
              );
            }
            return (
              <NestedNavs
                key={nest.key}
                nav={nest}
                open={open}
                setOpen={setOpen}
                nested={nested + 1}
              />
            );
          })}
        </List>
      </Collapse>
    </Fragment>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Lists: Story = {
  args: {
    disablePadding: true,
    children: (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string, storyContext: StoryContext): string => `
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

<List
  ${argProps(storyContext)}
>
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
  </ListItem>
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <WorkIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Work" secondary="Jan 7, 2014" />
  </ListItem>
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <BeachAccessIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary="Vacation" secondary="July 20, 2014" />
  </ListItem>
</List>
        `,
      },
    },
  },
};

export const ListNavigation: Story = {
  render: ({
    groupCollapse,
    setGroupCollapse,
    open,
    setOpen,
    ...args
  }: any) => {
    return (
      <Paper>
        <List {...args}>
          {DATA.map((item) => {
            return (
              <Fragment key={item.key}>
                <ListSubheader
                  disableSticky
                  onClick={() => {
                    if (!Boolean(groupCollapse.includes(item.key))) {
                      setGroupCollapse((prevState: any) => [
                        ...prevState,
                        item.key,
                      ]);
                    } else {
                      setGroupCollapse((prevState: any) =>
                        prevState.filter((d: any) => d !== item.key)
                      );
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {item.title}
                </ListSubheader>
                <Collapse in={Boolean(!groupCollapse.includes(item.key))}>
                  {item.navs.map((nav) => {
                    if (!Boolean(nav?.nested)) {
                      return (
                        <ListItemButton key={nav.key}>
                          <ListItemIcon>{nav.icon}</ListItemIcon>
                          <ListItemText primary={nav.name} />
                        </ListItemButton>
                      );
                    }

                    return (
                      <NestedNavs
                        key={nav.key}
                        nav={nav}
                        open={open}
                        setOpen={setOpen}
                      />
                    );
                  })}
                </Collapse>
              </Fragment>
            );
          })}
        </List>
      </Paper>
    );
  },
  args: {
    disablePadding: true,
  },
  decorators: [
    (Story) => {
      const [groupCollapse, setGroupCollapse] = useState<string[]>([""]);
      const [open, setOpen] = useState<string[]>([""]);
      const [args, updateArgs] = useArgs();
      return (
        <Story
          args={
            {
              open,
              setOpen,
              ...args,
              groupCollapse,
              setGroupCollapse,
            } as any
          }
        />
      );
    },
  ],
};
