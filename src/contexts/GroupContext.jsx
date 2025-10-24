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
       name: 'Ethical Decision-Making for Travel Professionals',
      members: 45, 
      type: 'Training group', 
      image: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/6496072a98059dba3f02fdfa/0x0.png'
    },
    { 
      id: 2, 
      name: 'Tourism Industry Trainers', 
      members: 12, 
      type: 'Professional development', 
      image: 'https://tiesinstitute.com/wp-content/uploads/2022/05/tourism.webp'
    },
    { 
      id: 3, 
      name: 'Safety Protection Tourism', 
      members: 28, 
      type: 'Advocacy group', 
      image: 'https://admin.executiveprotectionbd.com/service_img/Travel.jpg'
    },
    { 
      id: 4, 
      name: 'Ethical Tourism Compliance Officers', 
      members: 18, 
      type: 'Compliance training', 
      image: 'https://www.eqs.com/assets/2021/11/compliance-officer-1024x576.png'
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