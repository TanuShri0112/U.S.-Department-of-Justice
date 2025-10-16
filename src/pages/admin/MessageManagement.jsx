import React, { useState } from 'react';
import { MessageSquare, Send, Users, Search, Filter, Archive, Trash2, Reply, Forward } from 'lucide-react';

const MessageManagement = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      senderRole: "Instructor",
      recipient: "Admin",
      subject: "Course Content Update Request",
      content: "I need to update the Law Enforcement Training module with the latest DOJ guidelines. Could you please provide access to edit the course materials?",
      timestamp: "2024-01-15 14:30",
      status: "unread",
      priority: "High",
      category: "Course Management",
      attachments: ["guidelines_2024.pdf"]
    },
    {
      id: 2,
      sender: "Prof. Michael Chen",
      senderRole: "Instructor",
      recipient: "Admin",
      subject: "Student Progress Report",
      content: "The monthly progress reports for the Educator Training program are ready. Please find the attached analytics showing completion rates and performance metrics.",
      timestamp: "2024-01-15 12:15",
      status: "read",
      priority: "Medium",
      category: "Reporting",
      attachments: ["progress_report_jan.pdf", "analytics.xlsx"]
    },
    {
      id: 3,
      sender: "Capt. David Wilson",
      senderRole: "Student",
      recipient: "Admin",
      subject: "Technical Issue with Assessment",
      content: "I'm experiencing technical difficulties with the Module 2 assessment. The quiz questions are not loading properly and I'm unable to submit my answers.",
      timestamp: "2024-01-15 10:45",
      status: "unread",
      priority: "High",
      category: "Technical Support",
      attachments: []
    },
    {
      id: 4,
      sender: "Dr. Lisa Rodriguez",
      senderRole: "Instructor",
      recipient: "Admin",
      subject: "New Training Module Proposal",
      content: "I'd like to propose a new Youth Advocacy workshop focusing on community engagement strategies. I've prepared a detailed curriculum outline.",
      timestamp: "2024-01-14 16:20",
      status: "read",
      priority: "Low",
      category: "Course Development",
      attachments: ["curriculum_outline.docx"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const priorities = ['All', 'High', 'Medium', 'Low'];
  const categories = ['All', 'Course Management', 'Reporting', 'Technical Support', 'Course Development', 'General'];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || message.priority === filterPriority;
    const matchesCategory = filterCategory === 'All' || message.category === filterCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const highPriorityCount = messages.filter(m => m.priority === 'High').length;

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, status: 'read' } : m
    ));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleArchiveMessage = (id) => {
    // Archive functionality
    setMessages(messages.filter(m => m.id !== id));
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Instructor': return 'bg-blue-100 text-blue-700';
      case 'Student': return 'bg-green-100 text-green-700';
      case 'Admin': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] space-x-6">
      {/* Messages List */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                <p className="text-sm text-gray-600">{unreadCount} unread</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => {
                setSelectedMessage(message);
                handleMarkAsRead(message.id);
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              } ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{message.sender}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleStyle(message.senderRole)}`}>
                    {message.senderRole}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(message.priority)}`}>
                    {message.priority}
                  </span>
                  {message.status === 'unread' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">{message.subject}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{message.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{message.timestamp}</span>
                {message.attachments.length > 0 && (
                  <span className="flex items-center gap-1">
                    📎 {message.attachments.length}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            {/* Message Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{selectedMessage.sender}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleStyle(selectedMessage.senderRole)}`}>
                        {selectedMessage.senderRole}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMessage.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                  <button
                    onClick={() => handleArchiveMessage(selectedMessage.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMessage.subject}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Category: {selectedMessage.category}</span>
                {selectedMessage.attachments.length > 0 && (
                  <span className="flex items-center gap-1">
                    📎 {selectedMessage.attachments.length} attachment(s)
                  </span>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
              
              {/* Attachments */}
              {selectedMessage.attachments.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          📎
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{attachment}</p>
                          <p className="text-xs text-gray-500">Click to download</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reply Section */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  <Forward className="w-4 h-4" />
                  Forward
                </button>
              </div>
              <div className="border border-gray-300 rounded-lg">
                <textarea
                  placeholder="Type your reply..."
                  className="w-full p-3 border-0 rounded-lg focus:ring-0 resize-none"
                  rows={4}
                />
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>To: {selectedMessage.sender}</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Message Selected</h3>
              <p className="text-gray-600">Select a message from the list to view its details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManagement;
