# DataTable Actions Examples

The DataTable component now supports an `actions` prop that allows you to add custom UI elements to the right side of the search column.

## Basic Usage

```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumn="name"
  searchPlaceholder="Search..."
  actions={<Button>Add New</Button>}
/>
```

## Multiple Actions

```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumn="name"
  searchPlaceholder="Search..."
  actions={
    <>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Add New
      </Button>
    </>
  }
/>
```

## With Dropdown Menu

```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumn="name"
  searchPlaceholder="Search..."
  actions={
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button>Add New</Button>
    </>
  }
/>
```

## With Select Filter

```tsx
<DataTable
  columns={columns}
  data={data}
  searchColumn="name"
  searchPlaceholder="Search..."
  actions={
    <>
      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button>Add New</Button>
    </>
  }
/>
```

## Layout Structure

The actions are positioned as follows:

```
[Search Input]                    [Actions Area]
```

The actions area uses `flex items-center space-x-2` for consistent spacing between elements.
