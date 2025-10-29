import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FileText, Upload, Plus, List, Grid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox'; // Note: Checkbox is imported but not used in this component.
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ResourceListView } from '@/components/resources/ResourceListView';
import { AddResourceDialog } from '@/components/resources/AddResourceDialog';
import { FileUploadTab } from '@/components/resources/FileUploadTab';
import { ResourceDetailDialog } from '@/components/resources/ResourceDetailDialog';
import { EditResourceDialog } from '@/components/resources/EditResourceDialog';

/**
 * JSDoc type definitions for clarity and editor support.
 */

/**
 * @typedef {object} SkillCategory
 * @property {string} category
 * @property {string[]} items
 */

/**
 * @typedef {object} MetadataContent
 * @property {string} creator
 * @property {string} created
 * @property {string[]} tags
 */

/**
 * @typedef {object} LibraryContent
 * @property {string} type
 * @property {string} scope
 * @property {boolean} favorite
 */

/**
 * @typedef {object} ResourceContent
 * @property {SkillCategory[]} [skills]
 * @property {MetadataContent} [metadata]
 * @property {LibraryContent} [library]
 */

/**
 * @typedef {object} ResourceType
 * @property {string} id
 * @property {string} title
 * @property {string} image
 * @property {string} date
 * @property {string} author
 * @property {string} type
 * @property {ResourceContent} [content]
 */

const initialResourcesData = [
  {
    id: '1',
    title: 'Lessons Learned Report: DRF Pilot (2024)',
    image: '/placeholder.svg',
    date: '06/15/2024',
    author: 'DAI Global',
    type: 'document',
    content: {
      metadata: {
        creator: 'MEL Team',
        created: 'Jun 15, 2024',
        tags: ['lessons learned', 'DRF', 'MEL', 'evaluation']
      },
      library: {
        type: 'Lessons Learned',
        scope: 'Organization',
        favorite: true
      }
    }
  },
  {
    id: '2',
    title: 'MEL Framework Templates (Logframe, Indicator Register)',
    image: '/placeholder.svg',
    date: '09/01/2025',
    author: 'DAI Global',
    type: 'template',
    content: {
      metadata: {
        creator: 'MEL Team',
        created: 'Sep 1, 2025',
        tags: ['templates', 'logframe', 'indicators']
      },
      library: {
        type: 'Templates',
        scope: 'Organization',
        favorite: false
      }
    }
  },
  {
    id: '3',
    title: 'Policy Brief: Strengthening Evidence in DRF Programs',
    image: '/placeholder.svg',
    date: '07/20/2025',
    author: 'DAI Global',
    type: 'brief',
    content: {
      metadata: {
        creator: 'Policy Unit',
        created: 'Jul 20, 2025',
        tags: ['policy', 'learning brief', 'evidence']
      },
      library: {
        type: 'Briefs',
        scope: 'Organization',
        favorite: false
      }
    }
  },
  {
    id: '4',
    title: 'Recorded Webinar: Reflection Workshop (Q3 2025)',
    image: '/placeholder.svg',
    date: '08/12/2025',
    author: 'DAI Global',
    type: 'video',
    content: {
      metadata: {
        creator: 'Knowledge Team',
        created: 'Aug 12, 2025',
        tags: ['webinar', 'reflection', 'recording']
      },
      library: {
        type: 'Webinars',
        scope: 'Organization',
        favorite: false
      }
    }
  }
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [resourcesData, setResourcesData] = useState(initialResourcesData);
  const [filters, setFilters] = useState({
    organization: true,
    business: true,
    builtIn: true,
    favorites: true,
    personal: true
  });

  /** @param {ResourceType} resource */
  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setShowResourceDialog(true);
  };

  const handleCloseDialog = () => {
    setShowResourceDialog(false);
    setSelectedResource(null);
  };

  const handleDetailsClick = () => {
    setShowResourceDialog(false);
    setShowDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setShowDetailDialog(false);
    setSelectedResource(null);
  };

  const handleEditClick = () => {
    setShowDetailDialog(false);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedResource(null);
  };

  /** @param {ResourceType} updatedResource */
  const handleSaveResource = (updatedResource) => {
    setResourcesData(prevData => 
      prevData.map(resource => 
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
    setShowEditDialog(false);
    setSelectedResource(null);
    // toast.success is already called inside the EditResourceDialog
  };

  const handleAddResource = () => {
    setShowAddResourceDialog(true);
  };

  /** @param {string} resourceType */
  const handleResourceTypeSelect = (resourceType) => {
    console.log(`Creating new ${resourceType} resource`);
    // Logic to handle creating a new resource of a specific type would go here.
  };

  /** @param {string} type */
  const getResourceIcon = (type) => {
    // This could be expanded to return different icons based on the resource type
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  // Filter resources based on search query
  const filteredResources = resourcesData.filter(
    resource => resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 animate-fade-in max-w-7xl mx-auto">
      <PageHeader 
        title="Knowledge Repository" 
        description="Digital library for lessons learned, MEL templates, briefs, and recordings"
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="catalog" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Library</span>
                <span className="ml-1 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">2694</span>
              </TabsTrigger>
              <TabsTrigger value="uploaded" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Uploaded files</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-3">
            <Button 
              variant="default" 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleAddResource}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
            <div className="flex border rounded-md">
              <Button 
                variant={viewMode === 'grid' ? "default" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? "default" : "ghost"} 
                size="icon" 
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} className="w-full">
          <TabsContent value="catalog" className="m-0 outline-none">
            {viewMode === 'grid' ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredResources.map(resource => (
                  <div 
                    key={resource.id} 
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {getResourceIcon(resource.type)}
                      </div>
                      <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <List className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 truncate">{resource.title}</h3>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{resource.date}</span>
                        <span>{resource.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ResourceListView 
                resources={filteredResources}
                onResourceClick={handleResourceClick}
              />
            )}
          </TabsContent>
          
          <TabsContent value="uploaded" className="m-0 outline-none">
            <FileUploadTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Resource quick view dialog */}
      <Dialog open={showResourceDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedResource?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-[3fr_2fr] gap-6">
            {selectedResource?.content?.skills && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Skill</h3>
                {selectedResource.content.skills.map((skillCategory, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{index + 1}. {skillCategory.category}</h4>
                    <ul className="space-y-1 text-sm">
                      {skillCategory.items.map((item, i) => (
                        <li key={i} className="pl-2">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-6">
              {selectedResource?.content?.library && (
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h3 className="font-medium text-lg mb-4">Library</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                      <List className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Type:</span>
                      <span className="text-sm">{selectedResource.content.library.type}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Scope:</span>
                      <span className="text-sm">{selectedResource.content.library.scope}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm font-medium">Favorite:</span>
                      <span className={cn(
                        "text-sm",
                        selectedResource.content.library.favorite ? "text-blue-500" : ""
                      )}>
                        {selectedResource.content.library.favorite ? "Favorite" : "Not favorite"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedResource?.content?.metadata && (
                <div>
                  <h3 className="font-medium text-lg mb-4">Metadata</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Creator</h4>
                      <p className="text-blue-500">{selectedResource.content.metadata.creator}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Created</h4>
                      <p>{selectedResource.content.metadata.created}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Tags</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedResource.content.metadata.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={handleDetailsClick}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed Resource Dialog */}
      <ResourceDetailDialog 
        resource={selectedResource}
        open={showDetailDialog}
        onClose={handleCloseDetailDialog}
        onEdit={handleEditClick}
      />

      {/* Edit Resource Dialog */}
      <EditResourceDialog
        resource={selectedResource}
        open={showEditDialog}
        onClose={handleCloseEditDialog}
        onSave={handleSaveResource}
      />

      {/* Add Resource Dialog */}
      <AddResourceDialog 
        open={showAddResourceDialog} 
        onClose={() => setShowAddResourceDialog(false)}
        onSelect={handleResourceTypeSelect}
      />
    </div>
  );
};

export default Resources;