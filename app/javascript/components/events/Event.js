import React from 'react';
import { Timeline, StyledOcticon } from '@primer/components';
import {
  CommentIcon,
  GitForkIcon,
  IssueOpenedIcon,
  IssueClosedIcon,
  IssueReopenedIcon,
  GitPullRequestIcon,
  GitMergeIcon,
  CommentDiscussionIcon,
  CheckIcon,
  FileDiffIcon,
  EyeIcon,
  TagIcon,
  StarIcon,
} from '@primer/octicons-react';

import ExternalLink from '../external_link/ExternalLink';

const Event = (props) => {
  const { event } = props;

  const username = event.actor.display_login;

  let show = true;
  const payload = event.payload;
  const p_action = payload.action;
  let url;
  let icon;
  let color;
  let action;
  let item;
  switch (event.type) {
    case 'CommitCommentEvent': {
      const comment = payload.comment;
      url = comment.html_url;
      icon = CommentIcon;
      color = 'gray';
      action = 'commented on';
      item = comment.commit_id.substr(0, 7);

      break;
    }
    case 'ForkEvent': {
      icon = GitForkIcon;
      color = 'gray';
      action = 'forked';
      item = 'the repo';

      break;
    }
    case 'IssueCommentEvent': {
      url = payload.comment.html_url;
      switch (p_action) {
        case 'created': {
          icon = CommentIcon;
          color = 'gray';
          action = 'commented on';
          item = `#${payload.issue.number}`;

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'IssuesEvent': {
      const issue = payload.issue;
      url = issue.html_url;
      switch (p_action) {
        case 'opened': {
          icon = IssueOpenedIcon;
          color = 'green';
          action = 'opened';
          item = `#${issue.number}`;

          break;
        }
        case 'closed': {
          icon = IssueClosedIcon;
          color = 'red';
          action = 'closed';
          item = `#${issue.number}`;

          break;
        }
        case 'reopened': {
          icon = IssueReopenedIcon;
          color = 'green';
          action = 'reopened';
          item = `#${issue.number}`;

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'PullRequestEvent': {
      const pr = payload.pull_request;
      url = pr.html_url;
      switch (p_action) {
        case 'opened': {
          icon = GitPullRequestIcon;
          color = 'green';
          action = 'opened';
          item = `#${pr.number}`;

          break;
        }
        case 'closed': {
          if (pr.merged) {
            icon = GitMergeIcon;
            color = 'purple';
            action = 'merged';
            item = `#${pr.number}`;
          } else {
            icon = GitPullRequestIcon;
            color = 'red';
            action = 'closed';
            item = `#${pr.number}`;
          }

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'PullRequestReviewCommentEvent': {
      url = payload.comment.html_url;
      switch (p_action) {
        case 'created': {
          icon = CommentDiscussionIcon;
          color = 'gray';
          action = 'commented on a review of';
          item = `#${payload.pull_request.number}`;

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'PullRequestReviewEvent': {
      const review = payload.review;
      url = review.html_url;
      switch (p_action) {
        case 'created': {
          switch (review.state) {
            case 'approved': {
              icon = CheckIcon;
              color = 'green';
              action = 'approved';
              item = `#${payload.pull_request.number}`;

              break;
            }
            case 'changes_requested': {
              icon = FileDiffIcon;
              color = 'red';
              action = 'requested changes on';
              item = `#${payload.pull_request.number}`;

              break;
            }
            case 'commented': {
              icon = EyeIcon;
              color = 'gray';
              action = 'reviewed';
              item = `#${payload.pull_request.number}`;

              break;
            }
            default: {
              show = false;
              break;
            }
          }

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'ReleaseEvent': {
      const release = payload.release;
      url = release.html_url;
      switch (p_action) {
        case 'published': {
          icon = TagIcon;
          color = 'gray';
          action = 'released';
          item = release.tag_name;

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    case 'WatchEvent': {
      switch (p_action) {
        case 'started': {
          icon = StarIcon;
          color = 'yellow';
          action = 'starred';
          item = 'the repo';

          break;
        }
        default: {
          show = false;
          break;
        }
      }

      break;
    }
    default: {
      show = false;
      break;
    }
  }

  return (
    show && (
      <Timeline.Item>
        <Timeline.Badge bg={`${color}.5`}>
          <StyledOcticon icon={icon} color="white" />
        </Timeline.Badge>
        <Timeline.Body>
          <ExternalLink
            href={`https://github.com/${username}`}
            text={username}
          />
          {`${action} `}
          {url ? <ExternalLink href={url} text={item} /> : `${item} `}
          {formatTimeAgo(new Date(event.created_at))}
        </Timeline.Body>
      </Timeline.Item>
    )
  );
};

export default Event;

const formatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

const formatTimeAgo = (date) => {
  let duration = (date - new Date()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }

    duration /= division.amount;
  }
};
