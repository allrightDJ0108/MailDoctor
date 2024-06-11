import React from 'react';

function SideNav() {
  return (
    <nav className="side-nav">
      <ul className="nav-list">
        <li>Home</li>
        <li>View</li>
        <li>Help</li>
        <li>Message</li>
        <li>Insert</li>
        <li>Format Text</li>
        <li>Options</li>
      </ul>
      <div className="folders">
        <h3>Favourites</h3>
        <ul>
          <li>Inbox</li>
          <li>Sent Items</li>
          <li>Drafts</li>
        </ul>
        <h3>Folders</h3>
        <ul>
          <li>Inbox</li>
          <li>Junk Email</li>
          <li>Drafts</li>
          <li>Sent Items</li>
          <li>Deleted Items</li>
          <li>Archive</li>
          <li>Notes</li>
          <li>Conversation History</li>
          <li>Create new folder...</li>
        </ul>
        <h3>Groups</h3>
        <ul>
          <li>New group</li>
        </ul>
      </div>
    </nav>
  );
}

export default SideNav;
