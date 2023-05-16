import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem, Title, Text, Button } from '@mantine/core';
import { NavLink } from 'react-router-dom'
import {
  IconBellRinging,
  IconReceipt2,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/simple-query-users', label: 'Query', icon: IconBellRinging },
  { link: '/infinite-query-users', label: 'Infinite Query', icon: IconReceipt2 },
  { link: '/parallel-query', label: 'Parallel Query', icon: IconReceipt2 },
  { link: '/dependent-query', label: 'Dependent Query', icon: IconReceipt2 },
  { link: '/paginated-query', label: 'Paginated Query', icon: IconReceipt2 },
  { link: '/mutation', label: 'Mutation', icon: IconReceipt2 },
];

function Sidebar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Query');

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Title order={3}>React Query</Title>
          <Code sx={{ fontWeight: 700 }}>v4</Code>
        </Group>
        {links}
      </Navbar.Section>
    </>
  );
}

export default Sidebar;