import React from 'react';
import {
  BaseStyles,
  Header,
  Dropdown,
  Avatar,
  Link,
  BorderBox,
  StyledOcticon,
  Flash,
} from '@primer/components';
import { MarkGithubIcon, InfoIcon } from '@primer/octicons-react';

import {
  root_path,
  repositories_path,
  destroy_user_session_path,
  user_github_omniauth_authorize_path,
} from '../../routes.js.erb';

const NavigationBar = (props) => {
  const { user } = props;

  return (
    <BaseStyles>
      <Header>
        <Header.Item full>
          <Header.Link href={root_path()} fontSize={4}>
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
                  <Link href={repositories_path()}>Repositories</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={destroy_user_session_path()}>Sign out</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <BorderBox
              as={Header.Link}
              href={user_github_omniauth_authorize_path()}
              fontSize={3}
              px={2}
              py={1}
            >
              <span>Sign in with</span>
              <StyledOcticon icon={MarkGithubIcon} size={24} ml={2} />
            </BorderBox>
          )}
        </Header.Item>
      </Header>
      {!user && (
        <Flash variant="warning" m={2}>
          <StyledOcticon icon={InfoIcon} />
          <Link
            href={user_github_omniauth_authorize_path()}
            fontWeight="bold"
            color="gray.8"
            mr={1}
            muted
          >
            Signing in
          </Link>
          will allow you to make more searches and save them
        </Flash>
      )}
    </BaseStyles>
  );
};

export default NavigationBar;
