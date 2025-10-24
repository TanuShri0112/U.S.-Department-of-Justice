import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DollarSign, 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Tag,
  TrendingUp,
  TrendingDown,
  Percent
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PricingManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "U.S. Department of Justice- National Community Outreach & Prevention",
      price: 299.99,
      originalPrice: 399.99,
      currency: "USD",
      isPaid: true,
      discount: 25,
      category: "Law Enforcement"
    }
  ]);

  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      name: "Training Catalogue",
      price: 199.99,
      originalPrice: 249.99,
      currency: "USD",
      isPaid: true,
      discount: 20,
      courseCount: 8
    }
  ]);

  const [editingCourse, setEditingCourse] = useState(null);
  const [editingCatalog, setEditingCatalog] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    isPaid: true,
    discount: 0,
    category: ''
  });
  const [newCatalog, setNewCatalog] = useState({
    name: '',
    price: '',
    originalPrice: '',
    currency: 'USD',
    isPaid: true,
    discount: 0,
    courseCount: 0
  });

  const handleCourseEdit = (course) => {
    setEditingCourse(course);
  };

  const handleCourseSave = () => {
    setCourses(prev => 
      prev.map(course => 
        course.id === editingCourse.id ? editingCourse : course
      )
    );
    setEditingCourse(null);
    toast({
      title: "Course pricing updated",
      description: "Course pricing has been successfully updated.",
    });
  };

  const handleCourseCancel = () => {
    setEditingCourse(null);
  };

  const handleCatalogEdit = (catalog) => {
    setEditingCatalog(catalog);
  };

  const handleCatalogSave = () => {
    setCatalogs(prev => 
      prev.map(catalog => 
        catalog.id === editingCatalog.id ? editingCatalog : catalog
      )
    );
    setEditingCatalog(null);
    toast({
      title: "Catalog pricing updated",
      description: "Catalog pricing has been successfully updated.",
    });
  };

  const handleCatalogCancel = () => {
    setEditingCatalog(null);
  };

  const handleAddCourse = () => {
    const course = {
      id: Date.now(),
      ...newCourse,
      price: parseFloat(newCourse.price),
      originalPrice: parseFloat(newCourse.originalPrice),
      discount: parseInt(newCourse.discount)
    };
    setCourses(prev => [...prev, course]);
    setNewCourse({
      title: '',
      price: '',
      originalPrice: '',
      currency: 'USD',
      isPaid: true,
      discount: 0,
      category: ''
    });
    toast({
      title: "Course added",
      description: "New course has been added to pricing management.",
    });
  };

  const handleAddCatalog = () => {
    const catalog = {
      id: Date.now(),
      ...newCatalog,
      price: parseFloat(newCatalog.price),
      originalPrice: parseFloat(newCatalog.originalPrice),
      discount: parseInt(newCatalog.discount),
      courseCount: parseInt(newCatalog.courseCount)
    };
    setCatalogs(prev => [...prev, catalog]);
    setNewCatalog({
      name: '',
      price: '',
      originalPrice: '',
      currency: 'USD',
      isPaid: true,
      discount: 0,
      courseCount: 0
    });
    toast({
      title: "Catalog added",
      description: "New catalog has been added to pricing management.",
    });
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || !currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage course and catalog pricing, discounts, and payment settings
          </p>
        </div>
      </div>

      {/* Course Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Course Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Course */}
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Course Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <Label htmlFor="course-price">Price ($)</Label>
                <Input
                  id="course-price"
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="299.99"
                />
              </div>
              <div>
                <Label htmlFor="course-original-price">Original Price ($)</Label>
                <Input
                  id="course-original-price"
                  type="number"
                  value={newCourse.originalPrice}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="399.99"
                />
              </div>
              <div>
                <Label htmlFor="course-category">Category</Label>
                <Input
                  id="course-category"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Law Enforcement"
                />
              </div>
              <div>
                <Label htmlFor="course-currency">Currency</Label>
                <Select value={newCourse.currency} onValueChange={(value) => setNewCourse(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="course-paid">Paid Course</Label>
                <Switch
                  id="course-paid"
                  checked={newCourse.isPaid}
                  onCheckedChange={(checked) => setNewCourse(prev => ({ ...prev, isPaid: checked }))}
                />
              </div>
            </div>
            <Button onClick={handleAddCourse} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>

          {/* Course List */}
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                {editingCourse?.id === course.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={editingCourse.title}
                          onChange={(e) => setEditingCourse(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={editingCourse.price}
                          onChange={(e) => setEditingCourse(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Original Price ($)</Label>
                        <Input
                          type="number"
                          value={editingCourse.originalPrice}
                          onChange={(e) => setEditingCourse(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={editingCourse.category}
                          onChange={(e) => setEditingCourse(prev => ({ ...prev, category: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label>Paid Course</Label>
                        <Switch
                          checked={editingCourse.isPaid}
                          onCheckedChange={(checked) => setEditingCourse(prev => ({ ...prev, isPaid: checked }))}
                        />
                      </div>
                      <div>
                        <Label>Currency</Label>
                        <Select value={editingCourse.currency} onValueChange={(value) => setEditingCourse(prev => ({ ...prev, currency: value }))}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCourseSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCourseCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-lg font-bold">${course.price}</span>
                          <span className="text-sm text-gray-500">{course.currency}</span>
                        </div>
                        {course.originalPrice > course.price && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through">${course.originalPrice}</span>
                            <Badge variant="destructive" className="text-xs">
                              <Percent className="h-3 w-3 mr-1" />
                              {calculateDiscount(course.originalPrice, course.price)}% OFF
                            </Badge>
                          </div>
                        )}
                        <Badge variant="outline">{course.category}</Badge>
                        <Badge variant={course.isPaid ? "default" : "secondary"}>
                          {course.isPaid ? "Paid" : "Free"}
                        </Badge>
                      </div>
                    </div>
                    <Button onClick={() => handleCourseEdit(course)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Catalog Pricing Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Catalog Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Catalog */}
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Catalog Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="catalog-name">Catalog Name</Label>
                <Input
                  id="catalog-name"
                  value={newCatalog.name}
                  onChange={(e) => setNewCatalog(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter catalog name"
                />
              </div>
              <div>
                <Label htmlFor="catalog-price">Price ($)</Label>
                <Input
                  id="catalog-price"
                  type="number"
                  value={newCatalog.price}
                  onChange={(e) => setNewCatalog(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="199.99"
                />
              </div>
              <div>
                <Label htmlFor="catalog-original-price">Original Price ($)</Label>
                <Input
                  id="catalog-original-price"
                  type="number"
                  value={newCatalog.originalPrice}
                  onChange={(e) => setNewCatalog(prev => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="249.99"
                />
              </div>
              <div>
                <Label htmlFor="catalog-course-count">Course Count</Label>
                <Input
                  id="catalog-course-count"
                  type="number"
                  value={newCatalog.courseCount}
                  onChange={(e) => setNewCatalog(prev => ({ ...prev, courseCount: e.target.value }))}
                  placeholder="8"
                />
              </div>
              <div>
                <Label htmlFor="catalog-currency">Currency</Label>
                <Select value={newCatalog.currency} onValueChange={(value) => setNewCatalog(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="catalog-paid">Paid Catalog</Label>
                <Switch
                  id="catalog-paid"
                  checked={newCatalog.isPaid}
                  onCheckedChange={(checked) => setNewCatalog(prev => ({ ...prev, isPaid: checked }))}
                />
              </div>
            </div>
            <Button onClick={handleAddCatalog} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Catalog
            </Button>
          </div>

          {/* Catalog List */}
          <div className="space-y-3">
            {catalogs.map((catalog) => (
              <div key={catalog.id} className="p-4 border rounded-lg">
                {editingCatalog?.id === catalog.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={editingCatalog.name}
                          onChange={(e) => setEditingCatalog(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={editingCatalog.price}
                          onChange={(e) => setEditingCatalog(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Original Price ($)</Label>
                        <Input
                          type="number"
                          value={editingCatalog.originalPrice}
                          onChange={(e) => setEditingCatalog(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Course Count</Label>
                        <Input
                          type="number"
                          value={editingCatalog.courseCount}
                          onChange={(e) => setEditingCatalog(prev => ({ ...prev, courseCount: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label>Paid Catalog</Label>
                        <Switch
                          checked={editingCatalog.isPaid}
                          onCheckedChange={(checked) => setEditingCatalog(prev => ({ ...prev, isPaid: checked }))}
                        />
                      </div>
                      <div>
                        <Label>Currency</Label>
                        <Select value={editingCatalog.currency} onValueChange={(value) => setEditingCatalog(prev => ({ ...prev, currency: value }))}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCatalogSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCatalogCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{catalog.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                          <span className="text-lg font-bold">${catalog.price}</span>
                          <span className="text-sm text-gray-500">{catalog.currency}</span>
                        </div>
                        {catalog.originalPrice > catalog.price && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400 line-through">${catalog.originalPrice}</span>
                            <Badge variant="destructive" className="text-xs">
                              <Percent className="h-3 w-3 mr-1" />
                              {calculateDiscount(catalog.originalPrice, catalog.price)}% OFF
                            </Badge>
                          </div>
                        )}
                        <Badge variant="outline">{catalog.courseCount} courses</Badge>
                        <Badge variant={catalog.isPaid ? "default" : "secondary"}>
                          {catalog.isPaid ? "Paid" : "Free"}
                        </Badge>
                      </div>
                    </div>
                    <Button onClick={() => handleCatalogEdit(catalog)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingManagement;
