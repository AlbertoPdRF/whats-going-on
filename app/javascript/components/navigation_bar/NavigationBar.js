import React from 'react';
import {
  BaseStyles,
  Header,
  Dropdown,
  Avatar,
  Link,
  StyledOcticon,
} from '@primer/components';
import { MarkGithubIcon } from '@primer/octicons-react';

const NavigationBar = (props) => {
  const { user } = props;

  return (
    <BaseStyles>
      <Header>
        <Header.Item full>
          <Header.Link href="/" fontSize={4}>
            <span>Whagon</span>
          </Header.Link>
        </Header.Item>
        <Header.Item mr={0}>
          {user ? (
            <Dropdown>
              <Dropdown.Button>
                <Avatar
                  src={user.avatar}
                  size={24}
                  alt={`${user.username}'s avatar`}
                />
              </Dropdown.Button>
              <Dropdown.Menu direction="sw">
                <Dropdown.Item>
                  <Link href="sign-out">Sign out</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Header.Link
              href="/users/auth/github"
              fontSize={3}
              border={1}
              borderRadius={1}
              borderStyle="solid"
              px={2}
              py={1}
            >
              <span>Sign in with</span>
              <StyledOcticon icon={MarkGithubIcon} size={24} ml={2} />
            </Header.Link>
          )}
        </Header.Item>
      </Header>
    </BaseStyles>
  );
};

export default NavigationBar;
