import React, { createContext, useContext, useState } from 'react';

/**
 * @typedef {object} Group
 * @property {number} id
 * @property {string} name
 * @property {number} members
 * @property {string} type
 * @property {string} image
 */

/**
 * @typedef {object} GroupContextType
 * @property {Group[]} groups
 * @property {(groupId: number, updatedData: Partial<Group>) => void} updateGroup
 * @property {(groupId: number) => void} deleteGroup
 * @property {(group: Omit<Group, 'id'>) => void} addGroup
 */

/**
 * @type {React.Context<GroupContextType | undefined>}
 */
const GroupContext = createContext(undefined);

/**
 * Provides group data and management functions to its children.
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 */
export function GroupProvider({ children }) {
  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: 'Responsible Travel Professionals', 
      members: 45, 
      type: 'Training group', 
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&auto=format'
    },
    { 
      id: 2, 
      name: 'Tourism Industry Trainers', 
      members: 12, 
      type: 'Professional development', 
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&auto=format'
    },
    { 
      id: 3, 
      name: 'Child Protection Champions', 
      members: 28, 
      type: 'Advocacy group', 
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format'
    },
    { 
      id: 4, 
      name: 'Ethical Tourism Compliance Officers', 
      members: 18, 
      type: 'Compliance training', 
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&auto=format'
    },
  ]);

  /**
   * Updates a group's data.
   * @param {number} groupId - The ID of the group to update.
   * @param {Partial<Group>} updatedData - An object with the group properties to update.
   */
  const updateGroup = (groupId, updatedData) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.id === groupId ? { ...group, ...updatedData } : group
      )
    );
  };

  /**
   * Deletes a group by its ID.
   * @param {number} groupId - The ID of the group to delete.
   */
  const deleteGroup = (groupId) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  /**
   * Adds a new group to the list.
   * @param {Omit<Group, 'id'>} newGroup - The new group data, without an ID.
   */
  const addGroup = (newGroup) => {
    const id = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    setGroups(prevGroups => [...prevGroups, { ...newGroup, id }]);
  };

  return (
    <GroupContext.Provider value={{ groups, updateGroup, deleteGroup, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
}

/**
 * Custom hook to consume the GroupContext.
 * @returns {GroupContextType} The context value.
 */
export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
}