"use client"

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function formatDate(date, locale = "es-AR") {
  return new Intl.DateTimeFormat(locale).format(date);
}
function formatNumber(value, locale = "es-AR") {
  return new Intl.NumberFormat(locale).format(value);
}
function debounce(func, wait) {
  let timeout = null;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
function generateId(prefix = "bizuit") {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || // @ts-ignore
  navigator.msMaxTouchPoints > 0;
}

// src/components/ui/button.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            // Default variant
            "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default",
            // Destructive variant
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
            // Outline variant
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
            // Secondary variant
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": variant === "secondary",
            // Ghost variant
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            // Link variant
            "text-primary underline-offset-4 hover:underline": variant === "link"
          },
          {
            // Default size
            "h-9 px-4 py-2": size === "default",
            // Small size
            "h-8 rounded-md px-3 text-xs": size === "sm",
            // Large size
            "h-10 rounded-md px-8": size === "lg",
            // Icon size
            "h-9 w-9": size === "icon"
          },
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/data/data-grid.tsx
import * as React2 from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function BizuitDataGrid({
  columns,
  data,
  selectable = "none",
  selectedRows,
  onSelectionChange,
  sortable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  onRowClick,
  className,
  emptyMessage = "No hay datos para mostrar",
  loading = false,
  mobileMode = "scroll"
}) {
  const [sorting, setSorting] = React2.useState([]);
  const [columnFilters, setColumnFilters] = React2.useState([]);
  const [columnVisibility, setColumnVisibility] = React2.useState({});
  const [rowSelection, setRowSelection] = React2.useState(
    selectedRows || {}
  );
  React2.useEffect(() => {
    if (selectedRows !== void 0) {
      setRowSelection(selectedRows);
    }
  }, [selectedRows]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...sortable && {
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel()
    },
    ...filterable && {
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel()
    },
    ...paginated && {
      getPaginationRowModel: getPaginationRowModel()
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onSelectionChange?.(newSelection);
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize
      }
    },
    ...selectable === "none" && { enableRowSelection: false },
    ...selectable === "single" && { enableMultiRowSelection: false }
  });
  if (loading) {
    return /* @__PURE__ */ jsx2("div", { className: cn("w-full", className), children: /* @__PURE__ */ jsx2("div", { className: "rounded-md border", children: /* @__PURE__ */ jsx2("div", { className: "p-8 text-center text-muted-foreground", children: "Cargando..." }) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full space-y-4", className), children: [
    filterable && /* @__PURE__ */ jsx2("div", { className: "flex items-center gap-2" }),
    /* @__PURE__ */ jsx2("div", { className: "rounded-md border overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: cn("overflow-auto", mobileMode === "scroll" && "max-w-full"), children: /* @__PURE__ */ jsxs("table", { className: "w-full caption-bottom text-sm", children: [
      /* @__PURE__ */ jsx2("thead", { className: "border-b bg-muted/50", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx2("tr", { className: "border-b transition-colors", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx2(
        "th",
        {
          className: "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
          children: header.isPlaceholder ? null : flexRender(
            header.column.columnDef.header,
            header.getContext()
          )
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx2("tbody", { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx2(
        "tr",
        {
          "data-state": row.getIsSelected() && "selected",
          onClick: () => onRowClick?.(row.original),
          className: cn(
            "border-b transition-colors hover:bg-muted/50",
            "data-[state=selected]:bg-muted",
            onRowClick && "cursor-pointer"
          ),
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx2(
            "td",
            {
              className: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
              children: flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) : /* @__PURE__ */ jsx2("tr", { children: /* @__PURE__ */ jsx2(
        "td",
        {
          colSpan: columns.length,
          className: "h-24 text-center text-muted-foreground",
          children: emptyMessage
        }
      ) }) })
    ] }) }) }),
    paginated && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2", children: [
      /* @__PURE__ */ jsx2("div", { className: "flex-1 text-sm text-muted-foreground", children: selectable !== "none" && /* @__PURE__ */ jsxs("span", { children: [
        table.getFilteredSelectedRowModel().rows.length,
        " de",
        " ",
        table.getFilteredRowModel().rows.length,
        " fila(s) seleccionadas"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium", children: "Filas por p\xE1gina" }),
          /* @__PURE__ */ jsx2(
            "select",
            {
              className: "h-8 w-[70px] rounded-md border border-input bg-transparent px-2 text-sm",
              value: table.getState().pagination.pageSize,
              onChange: (e) => {
                table.setPageSize(Number(e.target.value));
              },
              children: [10, 20, 30, 40, 50].map((pageSize2) => /* @__PURE__ */ jsx2("option", { value: pageSize2, children: pageSize2 }, pageSize2))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
          "P\xE1gina ",
          table.getState().pagination.pageIndex + 1,
          " de",
          " ",
          table.getPageCount()
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "h-8 w-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
              onClick: () => table.setPageIndex(0),
              disabled: !table.getCanPreviousPage(),
              children: [
                /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "Ir a la primera p\xE1gina" }),
                "<<"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "h-8 w-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
              onClick: () => table.previousPage(),
              disabled: !table.getCanPreviousPage(),
              children: [
                /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "P\xE1gina anterior" }),
                "<"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "h-8 w-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
              onClick: () => table.nextPage(),
              disabled: !table.getCanNextPage(),
              children: [
                /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "P\xE1gina siguiente" }),
                ">"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "h-8 w-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
              onClick: () => table.setPageIndex(table.getPageCount() - 1),
              disabled: !table.getCanNextPage(),
              children: [
                /* @__PURE__ */ jsx2("span", { className: "sr-only", children: "Ir a la \xFAltima p\xE1gina" }),
                ">>"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SortableHeader({ column, children }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: "flex items-center gap-1 hover:text-foreground",
      onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      children: [
        children,
        /* @__PURE__ */ jsx2(ArrowUpDown, { className: "ml-2 h-4 w-4" })
      ]
    }
  );
}

// src/components/forms/bizuit-combo.tsx
import * as React3 from "react";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function BizuitCombo({
  options: initialOptions,
  value,
  onChange,
  multiSelect = false,
  searchable = true,
  searchPlaceholder = "Buscar...",
  placeholder = "Seleccionar...",
  emptyMessage = "No se encontraron opciones",
  onSearch,
  loading = false,
  disabled = false,
  className,
  renderOption,
  maxSelected,
  showCount = true,
  clearable = true,
  virtualized = false,
  mobileFullScreen = true
}) {
  const [open, setOpen] = React3.useState(false);
  const [search, setSearch] = React3.useState("");
  const [options, setOptions] = React3.useState(initialOptions);
  const [isSearching, setIsSearching] = React3.useState(false);
  const selectedValues = React3.useMemo(() => {
    if (value === void 0 || value === null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);
  const debouncedSearch = React3.useMemo(
    () => onSearch ? debounce(async (query) => {
      setIsSearching(true);
      try {
        const results = await onSearch(query);
        setOptions(results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300) : null,
    [onSearch]
  );
  const handleSearchChange = (value2) => {
    setSearch(value2);
    if (debouncedSearch) {
      debouncedSearch(value2);
    }
  };
  const filteredOptions = React3.useMemo(() => {
    if (!searchable || onSearch) return options;
    if (!search) return options;
    return options.filter(
      (option) => option.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable, onSearch]);
  const groupedOptions = React3.useMemo(() => {
    const groups = {};
    filteredOptions.forEach((option) => {
      const group = option.group || "_default";
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
    });
    return groups;
  }, [filteredOptions]);
  const handleSelect = (selectedValue) => {
    if (multiSelect) {
      let newValues;
      if (selectedValues.includes(selectedValue)) {
        newValues = selectedValues.filter((v) => v !== selectedValue);
      } else {
        if (maxSelected && selectedValues.length >= maxSelected) {
          return;
        }
        newValues = [...selectedValues, selectedValue];
      }
      onChange?.(newValues);
    } else {
      onChange?.(selectedValue);
      setOpen(false);
    }
    setSearch("");
  };
  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(multiSelect ? [] : "");
  };
  const handleRemoveItem = (valueToRemove, e) => {
    e.stopPropagation();
    if (multiSelect) {
      const newValues = selectedValues.filter((v) => v !== valueToRemove);
      onChange?.(newValues);
    }
  };
  const selectedLabels = React3.useMemo(() => {
    return selectedValues.map((v) => options.find((opt) => opt.value === v)?.label).filter(Boolean);
  }, [selectedValues, options]);
  const triggerText = React3.useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    if (multiSelect) {
      if (showCount && selectedValues.length > 2) {
        return `${selectedValues.length} seleccionados`;
      }
      return selectedLabels.join(", ");
    }
    return selectedLabels[0] || placeholder;
  }, [selectedValues, selectedLabels, multiSelect, showCount, placeholder]);
  return /* @__PURE__ */ jsxs2(PopoverPrimitive.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx3(PopoverPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        disabled,
        className: cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "touch-manipulation",
          className
        ),
        children: [
          /* @__PURE__ */ jsx3("span", { className: "flex-1 truncate text-left", children: triggerText }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-1", children: [
            clearable && selectedValues.length > 0 && !disabled && /* @__PURE__ */ jsx3(
              X,
              {
                className: "h-4 w-4 opacity-50 hover:opacity-100",
                onClick: handleClear
              }
            ),
            /* @__PURE__ */ jsx3(ChevronsUpDown, { className: "h-4 w-4 opacity-50" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx3(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs2(
      PopoverPrimitive.Content,
      {
        align: "start",
        sideOffset: 4,
        className: cn(
          "z-50 w-[--radix-popover-trigger-width] rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          mobileFullScreen && "sm:w-[--radix-popover-trigger-width] max-sm:fixed max-sm:inset-4 max-sm:w-auto"
        ),
        children: [
          /* @__PURE__ */ jsxs2(Command, { shouldFilter: false, children: [
            searchable && /* @__PURE__ */ jsxs2("div", { className: "flex items-center border-b px-3", children: [
              /* @__PURE__ */ jsx3(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
              /* @__PURE__ */ jsx3(
                "input",
                {
                  className: "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                  placeholder: searchPlaceholder,
                  value: search,
                  onChange: (e) => handleSearchChange(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2(Command.List, { className: "max-h-[300px] overflow-y-auto p-1", children: [
              (loading || isSearching) && /* @__PURE__ */ jsx3(Command.Loading, { children: /* @__PURE__ */ jsx3("div", { className: "py-6 text-center text-sm text-muted-foreground", children: "Cargando..." }) }),
              !loading && !isSearching && filteredOptions.length === 0 && /* @__PURE__ */ jsx3(Command.Empty, { children: /* @__PURE__ */ jsx3("div", { className: "py-6 text-center text-sm text-muted-foreground", children: emptyMessage }) }),
              !loading && !isSearching && Object.entries(groupedOptions).map(([group, groupOptions]) => /* @__PURE__ */ jsx3(
                Command.Group,
                {
                  heading: group !== "_default" ? group : void 0,
                  children: groupOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return /* @__PURE__ */ jsxs2(
                      Command.Item,
                      {
                        value: option.value,
                        disabled: option.disabled,
                        onSelect: () => handleSelect(option.value),
                        className: cn(
                          "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                          "aria-selected:bg-accent aria-selected:text-accent-foreground",
                          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          "touch-manipulation"
                        ),
                        children: [
                          multiSelect && /* @__PURE__ */ jsx3(
                            "div",
                            {
                              className: cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                              ),
                              children: /* @__PURE__ */ jsx3(Check, { className: "h-4 w-4" })
                            }
                          ),
                          renderOption ? renderOption(option) : /* @__PURE__ */ jsx3("span", { className: "flex-1", children: option.label }),
                          !multiSelect && isSelected && /* @__PURE__ */ jsx3(Check, { className: "ml-auto h-4 w-4" })
                        ]
                      },
                      option.value
                    );
                  })
                },
                group
              ))
            ] })
          ] }),
          multiSelect && selectedValues.length > 0 && /* @__PURE__ */ jsx3("div", { className: "border-t p-2", children: /* @__PURE__ */ jsx3("div", { className: "flex flex-wrap gap-1", children: selectedValues.map((val) => {
            const option = options.find((opt) => opt.value === val);
            if (!option) return null;
            return /* @__PURE__ */ jsxs2(
              "div",
              {
                className: "inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground",
                children: [
                  /* @__PURE__ */ jsx3("span", { children: option.label }),
                  /* @__PURE__ */ jsx3(
                    X,
                    {
                      className: "h-3 w-3 cursor-pointer hover:opacity-70",
                      onClick: (e) => handleRemoveItem(val, e)
                    }
                  )
                ]
              },
              val
            );
          }) }) })
        ]
      }
    ) })
  ] });
}

// src/components/forms/bizuit-date-time-picker.tsx
import * as React4 from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive2 from "@radix-ui/react-popover";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function BizuitDateTimePicker({
  value,
  onChange,
  mode = "date",
  format: formatString,
  minDate,
  maxDate,
  locale = "es",
  disabled = false,
  placeholder,
  className,
  clearable = true,
  use24Hour = true
}) {
  const [open, setOpen] = React4.useState(false);
  const [selectedDate, setSelectedDate] = React4.useState(value);
  const [timeValue, setTimeValue] = React4.useState("");
  React4.useEffect(() => {
    setSelectedDate(value);
    if (value && (mode === "time" || mode === "datetime")) {
      setTimeValue(
        format(value, use24Hour ? "HH:mm" : "hh:mm a", { locale: es })
      );
    }
  }, [value, mode, use24Hour]);
  const defaultFormat = React4.useMemo(() => {
    if (formatString) return formatString;
    switch (mode) {
      case "date":
        return locale === "es" ? "dd/MM/yyyy" : "MM/dd/yyyy";
      case "time":
        return use24Hour ? "HH:mm" : "hh:mm a";
      case "datetime":
        return locale === "es" ? `dd/MM/yyyy ${use24Hour ? "HH:mm" : "hh:mm a"}` : `MM/dd/yyyy ${use24Hour ? "HH:mm" : "hh:mm a"}`;
    }
  }, [mode, locale, use24Hour, formatString]);
  const defaultPlaceholder = React4.useMemo(() => {
    if (placeholder) return placeholder;
    switch (mode) {
      case "date":
        return "Seleccionar fecha";
      case "time":
        return "Seleccionar hora";
      case "datetime":
        return "Seleccionar fecha y hora";
    }
  }, [mode, placeholder]);
  const handleDateSelect = (date) => {
    if (!date) {
      setSelectedDate(void 0);
      onChange?.(void 0);
      return;
    }
    if (mode === "datetime" && selectedDate) {
      date.setHours(selectedDate.getHours());
      date.setMinutes(selectedDate.getMinutes());
    }
    setSelectedDate(date);
    if (mode === "date") {
      onChange?.(date);
      setOpen(false);
    } else {
      onChange?.(date);
    }
  };
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setTimeValue(time);
    if (!time) return;
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = selectedDate ? new Date(selectedDate) : /* @__PURE__ */ new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setSelectedDate(newDate);
    onChange?.(newDate);
  };
  const displayValue = React4.useMemo(() => {
    if (!selectedDate) return "";
    return format(selectedDate, defaultFormat, {
      locale: locale === "es" ? es : void 0
    });
  }, [selectedDate, defaultFormat, locale]);
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(void 0);
    setTimeValue("");
    onChange?.(void 0);
  };
  return /* @__PURE__ */ jsxs3(PopoverPrimitive2.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx4(PopoverPrimitive2.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        disabled,
        className: cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "touch-manipulation",
          !displayValue && "text-muted-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs3("span", { className: "flex items-center gap-2", children: [
            mode === "time" ? /* @__PURE__ */ jsx4(Clock, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx4(CalendarIcon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx4("span", { children: displayValue || defaultPlaceholder })
          ] }),
          clearable && displayValue && !disabled && /* @__PURE__ */ jsx4(
            "button",
            {
              onClick: handleClear,
              className: "rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              children: "\xD7"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx4(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ jsx4(
      PopoverPrimitive2.Content,
      {
        align: "start",
        sideOffset: 4,
        className: cn(
          "z-50 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        ),
        children: /* @__PURE__ */ jsxs3("div", { className: "p-3", children: [
          (mode === "date" || mode === "datetime") && /* @__PURE__ */ jsx4(
            DayPicker,
            {
              mode: "single",
              selected: selectedDate,
              onSelect: handleDateSelect,
              disabled: (date) => {
                if (minDate && date < minDate) return true;
                if (maxDate && date > maxDate) return true;
                return false;
              },
              locale: locale === "es" ? es : void 0,
              className: "touch-manipulation",
              classNames: {
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                month_caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                button_previous: "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                button_next: "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                month_grid: "w-full border-collapse space-y-1",
                weekdays: "flex",
                weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                week: "flex w-full mt-2",
                day: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day_button: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
                selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                today: "bg-accent text-accent-foreground",
                outside: "text-muted-foreground opacity-50",
                disabled: "text-muted-foreground opacity-50",
                range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                hidden: "invisible"
              }
            }
          ),
          (mode === "time" || mode === "datetime") && /* @__PURE__ */ jsxs3("div", { className: "border-t pt-3 mt-3", children: [
            /* @__PURE__ */ jsx4("label", { className: "text-sm font-medium mb-2 block", children: "Hora" }),
            /* @__PURE__ */ jsx4(
              "input",
              {
                type: "time",
                value: timeValue,
                onChange: handleTimeChange,
                className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              }
            )
          ] }),
          mode === "datetime" && /* @__PURE__ */ jsx4("div", { className: "pt-3 flex justify-end", children: /* @__PURE__ */ jsx4(
            "button",
            {
              onClick: () => setOpen(false),
              className: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
              children: "Confirmar"
            }
          ) })
        ] })
      }
    ) })
  ] });
}

// src/components/forms/bizuit-slider.tsx
import * as React5 from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function BizuitSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled = false,
  marks,
  showTooltip = true,
  orientation = "horizontal",
  className,
  formatValue = (v) => String(v)
}) {
  const [internalValue, setInternalValue] = React5.useState(() => {
    if (value === void 0) {
      return range ? [min, max] : [min];
    }
    return Array.isArray(value) ? value : [value];
  });
  const [isDragging, setIsDragging] = React5.useState(false);
  React5.useEffect(() => {
    if (value !== void 0) {
      setInternalValue(Array.isArray(value) ? value : [value]);
    }
  }, [value]);
  const handleValueChange = (newValue) => {
    setInternalValue(newValue);
    onChange?.(range ? newValue : newValue[0]);
  };
  return /* @__PURE__ */ jsxs4("div", { className: cn("relative w-full py-4", className), children: [
    /* @__PURE__ */ jsxs4(
      SliderPrimitive.Root,
      {
        value: internalValue,
        onValueChange: handleValueChange,
        onValueCommit: handleValueChange,
        min,
        max,
        step,
        disabled,
        orientation,
        className: cn(
          "relative flex touch-none select-none items-center",
          orientation === "horizontal" ? "w-full" : "h-full flex-col",
          disabled && "opacity-50 cursor-not-allowed"
        ),
        onPointerDown: () => setIsDragging(true),
        onPointerUp: () => setIsDragging(false),
        children: [
          /* @__PURE__ */ jsx5(
            SliderPrimitive.Track,
            {
              className: cn(
                "relative grow rounded-full bg-secondary",
                orientation === "horizontal" ? "h-2 w-full" : "w-2 h-full"
              ),
              children: /* @__PURE__ */ jsx5(
                SliderPrimitive.Range,
                {
                  className: cn(
                    "absolute rounded-full bg-primary",
                    orientation === "horizontal" ? "h-full" : "w-full"
                  )
                }
              )
            }
          ),
          internalValue.map((_, index) => /* @__PURE__ */ jsx5(
            SliderPrimitive.Thumb,
            {
              className: cn(
                "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "touch-manipulation active:scale-110",
                showTooltip && "group relative"
              ),
              children: showTooltip && (isDragging || "hover") && /* @__PURE__ */ jsx5(
                "div",
                {
                  className: cn(
                    "absolute left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-popover text-popover-foreground shadow-md border",
                    "opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity",
                    orientation === "horizontal" ? "-top-8" : "-left-16"
                  ),
                  children: formatValue(internalValue[index])
                }
              )
            },
            index
          ))
        ]
      }
    ),
    marks && marks.length > 0 && /* @__PURE__ */ jsx5(
      "div",
      {
        className: cn(
          "absolute flex justify-between text-xs text-muted-foreground",
          orientation === "horizontal" ? "left-0 right-0 top-full mt-2" : "top-0 bottom-0 left-full ml-2 flex-col"
        ),
        children: marks.map((mark) => {
          const position = (mark.value - min) / (max - min) * 100;
          return /* @__PURE__ */ jsx5(
            "div",
            {
              style: {
                [orientation === "horizontal" ? "left" : "top"]: `${position}%`
              },
              className: cn(
                "absolute",
                orientation === "horizontal" ? "-translate-x-1/2" : "-translate-y-1/2"
              ),
              children: mark.label || mark.value
            },
            mark.value
          );
        })
      }
    ),
    /* @__PURE__ */ jsxs4("div", { className: "mt-6 flex justify-between text-sm", children: [
      /* @__PURE__ */ jsx5("span", { children: range ? `${formatValue(internalValue[0])} - ${formatValue(internalValue[1])}` : formatValue(internalValue[0]) }),
      /* @__PURE__ */ jsxs4("span", { className: "text-muted-foreground", children: [
        min,
        " - ",
        max
      ] })
    ] })
  ] });
}

// src/components/forms/bizuit-file-upload.tsx
import * as React6 from "react";
import { Upload, X as X2, File, Image as ImageIcon, FileText } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function BizuitFileUpload({
  value = [],
  onChange,
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  // 10MB default
  maxFiles = 10,
  disabled = false,
  showPreview = true,
  className,
  uploadText = "Seleccionar archivos",
  dragText = "Arrastra archivos aqu\xED",
  onError
}) {
  const [files, setFiles] = React6.useState(value);
  const [isDragging, setIsDragging] = React6.useState(false);
  const [previews, setPreviews] = React6.useState({});
  const inputRef = React6.useRef(null);
  React6.useEffect(() => {
    if (value.length !== files.length || value.some((file, i) => file !== files[i])) {
      setFiles(value);
    }
  }, [value, files]);
  React6.useEffect(() => {
    if (!showPreview) return;
    const newPreviews = {};
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newPreviews[file.name] = url;
      }
    });
    setPreviews(newPreviews);
    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files, showPreview]);
  const validateFile = (file) => {
    if (maxSize && file.size > maxSize) {
      return `El archivo "${file.name}" excede el tama\xF1o m\xE1ximo de ${formatBytes(maxSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileExtension = `.${file.name.split(".").pop()}`;
      const mimeType = file.type;
      const isAccepted = acceptedTypes.some(
        (type) => type === mimeType || type === fileExtension || type.endsWith("/*") && mimeType.startsWith(type.replace("/*", ""))
      );
      if (!isAccepted) {
        return `El archivo "${file.name}" no es un tipo v\xE1lido`;
      }
    }
    return null;
  };
  const handleFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;
    const fileArray = Array.from(newFiles);
    const validFiles = [];
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        continue;
      }
      validFiles.push(file);
    }
    const combinedFiles = multiple ? [...files, ...validFiles] : validFiles;
    const finalFiles = combinedFiles.slice(0, maxFiles);
    if (combinedFiles.length > maxFiles) {
      onError?.(`Se pueden subir un m\xE1ximo de ${maxFiles} archivos`);
    }
    setFiles(finalFiles);
    onChange?.(finalFiles);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };
  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };
  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return /* @__PURE__ */ jsx6(ImageIcon, { className: "h-4 w-4" });
    if (file.type.includes("pdf")) return /* @__PURE__ */ jsx6(FileText, { className: "h-4 w-4" });
    return /* @__PURE__ */ jsx6(File, { className: "h-4 w-4" });
  };
  return /* @__PURE__ */ jsxs5("div", { className: cn("w-full space-y-4", className), children: [
    /* @__PURE__ */ jsxs5(
      "div",
      {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: () => !disabled && inputRef.current?.click(),
        className: cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          "cursor-pointer hover:border-primary hover:bg-accent/50",
          "touch-manipulation",
          isDragging && "border-primary bg-accent",
          disabled && "cursor-not-allowed opacity-50"
        ),
        children: [
          /* @__PURE__ */ jsx6(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept,
              multiple,
              disabled,
              onChange: handleInputChange,
              className: "sr-only"
            }
          ),
          /* @__PURE__ */ jsx6(Upload, { className: "h-10 w-10 text-muted-foreground mb-2" }),
          /* @__PURE__ */ jsxs5("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium", children: uploadText }),
            /* @__PURE__ */ jsx6("p", { className: "text-xs text-muted-foreground mt-1", children: dragText }),
            maxSize && /* @__PURE__ */ jsxs5("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "Tama\xF1o m\xE1ximo: ",
              formatBytes(maxSize)
            ] })
          ] })
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsx6("div", { className: "space-y-2", children: files.map((file, index) => /* @__PURE__ */ jsxs5(
      "div",
      {
        className: "flex items-center gap-3 rounded-lg border p-3 bg-card",
        children: [
          showPreview && previews[file.name] ? /* @__PURE__ */ jsx6(
            "img",
            {
              src: previews[file.name],
              alt: file.name,
              className: "h-12 w-12 rounded object-cover"
            }
          ) : /* @__PURE__ */ jsx6("div", { className: "flex h-12 w-12 items-center justify-center rounded bg-muted", children: getFileIcon(file) }),
          /* @__PURE__ */ jsxs5("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx6("p", { className: "text-sm font-medium truncate", children: file.name }),
            /* @__PURE__ */ jsx6("p", { className: "text-xs text-muted-foreground", children: formatBytes(file.size) })
          ] }),
          !disabled && /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              onClick: () => handleRemoveFile(index),
              className: "flex h-8 w-8 items-center justify-center rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors",
              children: /* @__PURE__ */ jsx6(X2, { className: "h-4 w-4" })
            }
          )
        ]
      },
      `${file.name}-${index}`
    )) })
  ] });
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// src/components/forms/dynamic-form-field.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function DynamicFormField({
  parameter,
  value,
  onChange,
  required,
  className = "",
  showVariableLabel = false
}) {
  const isVariable = parameter.isVariable === true;
  const isRequired = required !== void 0 ? required : !isVariable && parameter.parameterDirection === 1;
  let labelSuffix = "";
  if (showVariableLabel && isVariable) {
    labelSuffix = " (variable)";
  } else if (isRequired) {
    labelSuffix = " *";
  } else {
    labelSuffix = " (opcional)";
  }
  const label = `${parameter.name}${labelSuffix}`;
  const paramType = parameter.type.toLowerCase();
  if (paramType === "string" || paramType === "text") {
    return /* @__PURE__ */ jsxs6("div", { className, children: [
      /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium mb-2", children: label }),
      /* @__PURE__ */ jsx7(
        "input",
        {
          type: "text",
          value: value || "",
          onChange: (e) => onChange(e.target.value),
          placeholder: `Ingrese ${parameter.name}`,
          required: isRequired,
          className: "w-full px-3 py-2 border rounded-md bg-background text-foreground"
        }
      )
    ] });
  }
  if (paramType === "int" || paramType === "integer" || paramType === "number" || paramType === "decimal" || paramType === "double") {
    return /* @__PURE__ */ jsxs6("div", { className, children: [
      /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium mb-2", children: label }),
      /* @__PURE__ */ jsx7(
        "input",
        {
          type: "number",
          value: value || "",
          onChange: (e) => onChange(e.target.value),
          placeholder: `Ingrese ${parameter.name}`,
          required: isRequired,
          className: "w-full px-3 py-2 border rounded-md bg-background text-foreground"
        }
      )
    ] });
  }
  if (paramType === "bool" || paramType === "boolean") {
    return /* @__PURE__ */ jsxs6("div", { className: `flex items-center gap-3 ${className}`, children: [
      /* @__PURE__ */ jsx7(
        "input",
        {
          type: "checkbox",
          id: parameter.name,
          checked: value || false,
          onChange: (e) => onChange(e.target.checked),
          className: "w-4 h-4 border rounded"
        }
      ),
      /* @__PURE__ */ jsx7("label", { htmlFor: parameter.name, className: "text-sm font-medium", children: label })
    ] });
  }
  if (paramType === "date" || paramType === "datetime" || paramType === "timestamp") {
    return /* @__PURE__ */ jsxs6("div", { className, children: [
      /* @__PURE__ */ jsx7("label", { className: "block text-sm font-medium mb-2", children: label }),
      /* @__PURE__ */ jsx7(
        BizuitDateTimePicker,
        {
          value,
          onChange,
          mode: paramType === "date" ? "date" : "datetime",
          locale: "es"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs6("div", { className, children: [
    /* @__PURE__ */ jsxs6("label", { className: "block text-sm font-medium mb-2", children: [
      label,
      /* @__PURE__ */ jsxs6("span", { className: "text-xs text-muted-foreground ml-2", children: [
        "(",
        parameter.type,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx7(
      "input",
      {
        type: "text",
        value: value || "",
        onChange: (e) => onChange(e.target.value),
        placeholder: `Ingrese ${parameter.name}`,
        required: isRequired,
        className: "w-full px-3 py-2 border rounded-md bg-background text-foreground"
      }
    )
  ] });
}

// src/components/forms/bizuit-radio-button.tsx
import * as React7 from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var BizuitRadioButton = React7.forwardRef(
  ({
    options,
    value,
    onChange,
    orientation = "vertical",
    disabled = false,
    className,
    name,
    required = false,
    label,
    error
  }, ref) => {
    return /* @__PURE__ */ jsxs7("div", { className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxs7("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: [
        label,
        required && /* @__PURE__ */ jsx8("span", { className: "text-red-500 ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsx8(
        RadioGroupPrimitive.Root,
        {
          ref,
          className: cn(
            "flex gap-4",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
          ),
          value,
          onValueChange: onChange,
          disabled,
          name,
          required,
          children: options.map((option) => /* @__PURE__ */ jsxs7("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsx8(
              RadioGroupPrimitive.Item,
              {
                value: option.value,
                disabled: option.disabled || disabled,
                className: cn(
                  "aspect-square h-4 w-4 rounded-full border border-primary text-primary",
                  "ring-offset-background focus:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "mt-0.5"
                  // Align with text
                ),
                children: /* @__PURE__ */ jsx8(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx8(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
              }
            ),
            /* @__PURE__ */ jsxs7("div", { className: "grid gap-1.5 leading-none", children: [
              /* @__PURE__ */ jsx8(
                "label",
                {
                  htmlFor: option.value,
                  className: cn(
                    "text-sm font-medium leading-none cursor-pointer",
                    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  ),
                  children: option.label
                }
              ),
              option.description && /* @__PURE__ */ jsx8("p", { className: "text-sm text-muted-foreground", children: option.description })
            ] })
          ] }, option.value))
        }
      ),
      error && /* @__PURE__ */ jsx8("p", { className: "text-sm text-red-500 mt-1", children: error })
    ] });
  }
);
BizuitRadioButton.displayName = "BizuitRadioButton";

// src/components/forms/bizuit-signature.tsx
import * as React8 from "react";
import { Eraser, Undo, Download } from "lucide-react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var BizuitSignature = React8.forwardRef(
  ({
    value,
    onChange,
    width = 500,
    height = 200,
    penColor = "#000000",
    penWidth = 2,
    backgroundColor = "#ffffff",
    className,
    label,
    required = false,
    error,
    disabled = false,
    showDownload = true
  }, ref) => {
    const canvasRef = React8.useRef(null);
    const [isDrawing, setIsDrawing] = React8.useState(false);
    const [history, setHistory] = React8.useState([]);
    const [currentHistoryIndex, setCurrentHistoryIndex] = React8.useState(-1);
    React8.useImperativeHandle(ref, () => canvasRef.current);
    React8.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      if (value) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          saveToHistory();
        };
        img.src = value;
      } else {
        saveToHistory();
      }
    }, []);
    const saveToHistory = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataURL = canvas.toDataURL();
      const newHistory = history.slice(0, currentHistoryIndex + 1);
      newHistory.push(dataURL);
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
    };
    const startDrawing = (e) => {
      if (disabled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      setIsDrawing(true);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const point = getPoint(e, rect);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    };
    const draw = (e) => {
      if (!isDrawing || disabled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const point = getPoint(e, rect);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    };
    const stopDrawing = () => {
      if (!isDrawing) return;
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataURL = canvas.toDataURL();
      onChange?.(dataURL);
      saveToHistory();
    };
    const getPoint = (e, rect) => {
      if ("touches" in e) {
        const touch = e.touches[0];
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    const handleClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      const dataURL = canvas.toDataURL();
      onChange?.(dataURL);
      saveToHistory();
    };
    const handleUndo = () => {
      if (currentHistoryIndex <= 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0);
        onChange?.(history[newIndex]);
      };
      img.src = history[newIndex];
    };
    const handleDownload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "signature.png";
      link.href = dataURL;
      link.click();
    };
    return /* @__PURE__ */ jsxs8("div", { className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxs8("label", { className: "text-sm font-medium leading-none", children: [
        label,
        required && /* @__PURE__ */ jsx9("span", { className: "text-red-500 ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsx9(
        "div",
        {
          className: cn(
            "border-2 rounded-lg overflow-hidden",
            error ? "border-red-500" : "border-gray-300 dark:border-gray-700",
            disabled && "opacity-50 cursor-not-allowed"
          ),
          style: { width: `${width}px` },
          children: /* @__PURE__ */ jsx9(
            "canvas",
            {
              ref: canvasRef,
              width,
              height,
              className: cn(
                "touch-none",
                disabled ? "cursor-not-allowed" : "cursor-crosshair"
              ),
              onMouseDown: startDrawing,
              onMouseMove: draw,
              onMouseUp: stopDrawing,
              onMouseLeave: stopDrawing,
              onTouchStart: startDrawing,
              onTouchMove: draw,
              onTouchEnd: stopDrawing
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs8("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs8(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleClear,
            disabled,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx9(Eraser, { className: "h-4 w-4" }),
              "Clear"
            ]
          }
        ),
        /* @__PURE__ */ jsxs8(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleUndo,
            disabled: disabled || currentHistoryIndex <= 0,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx9(Undo, { className: "h-4 w-4" }),
              "Undo"
            ]
          }
        ),
        showDownload && /* @__PURE__ */ jsxs8(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleDownload,
            disabled,
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx9(Download, { className: "h-4 w-4" }),
              "Download"
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx9("p", { className: "text-sm text-red-500", children: error })
    ] });
  }
);
BizuitSignature.displayName = "BizuitSignature";

// src/components/forms/bizuit-document-input.tsx
import * as React9 from "react";
import { Upload as Upload2, X as X3, FileText as FileText2, Image as ImageIcon2 } from "lucide-react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var BizuitDocumentInput = React9.forwardRef(
  ({
    value = [],
    onChange,
    accept = ".pdf,.doc,.docx,.txt",
    maxSize = 10 * 1024 * 1024,
    // 10MB default
    maxFiles = 5,
    label,
    description,
    className,
    disabled = false,
    required = false,
    error
  }, ref) => {
    const inputRef = React9.useRef(null);
    const [isDragging, setIsDragging] = React9.useState(false);
    const handleFiles = (files) => {
      if (!files || !onChange) return;
      const newFiles = [];
      const currentCount = value.length;
      for (let i = 0; i < files.length && currentCount + newFiles.length < maxFiles; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          continue;
        }
        const documentFile = {
          file,
          id: `${Date.now()}-${i}`
        };
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            documentFile.preview = reader.result;
          };
          reader.readAsDataURL(file);
        }
        newFiles.push(documentFile);
      }
      onChange([...value, ...newFiles]);
    };
    const removeFile = (id) => {
      if (onChange) {
        onChange(value.filter((f) => f.id !== id));
      }
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = () => {
      setIsDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };
    return /* @__PURE__ */ jsxs9("div", { ref, className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxs9("label", { className: "text-sm font-medium leading-none", children: [
        label,
        required && /* @__PURE__ */ jsx10("span", { className: "text-red-500 ml-1", children: "*" })
      ] }),
      description && /* @__PURE__ */ jsx10("p", { className: "text-sm text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxs9(
        "div",
        {
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          onClick: () => !disabled && inputRef.current?.click(),
          className: cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging && "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500"
          ),
          children: [
            /* @__PURE__ */ jsx10(Upload2, { className: "h-10 w-10 mx-auto text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsx10("p", { className: "text-sm text-muted-foreground", children: "Arrastra archivos aqu\xED o haz clic para seleccionar" }),
            /* @__PURE__ */ jsxs9("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "M\xE1x. ",
              maxFiles,
              " archivos, ",
              (maxSize / (1024 * 1024)).toFixed(0),
              "MB cada uno"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx10(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept,
          multiple: maxFiles > 1,
          onChange: (e) => handleFiles(e.target.files),
          disabled,
          className: "hidden"
        }
      ),
      value.length > 0 && /* @__PURE__ */ jsx10("div", { className: "space-y-2", children: value.map((doc) => /* @__PURE__ */ jsxs9(
        "div",
        {
          className: "flex items-center gap-3 p-3 border rounded-lg bg-card",
          children: [
            doc.preview ? /* @__PURE__ */ jsx10(ImageIcon2, { className: "h-8 w-8 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsx10(FileText2, { className: "h-8 w-8 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxs9("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx10("p", { className: "text-sm font-medium truncate", children: doc.file.name }),
              /* @__PURE__ */ jsxs9("p", { className: "text-xs text-muted-foreground", children: [
                (doc.file.size / 1024).toFixed(2),
                " KB"
              ] })
            ] }),
            /* @__PURE__ */ jsx10(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  removeFile(doc.id);
                },
                className: "text-muted-foreground hover:text-destructive transition-colors",
                disabled,
                children: /* @__PURE__ */ jsx10(X3, { className: "h-5 w-5" })
              }
            )
          ]
        },
        doc.id
      )) }),
      error && /* @__PURE__ */ jsx10("p", { className: "text-sm text-red-500", children: error })
    ] });
  }
);
BizuitDocumentInput.displayName = "BizuitDocumentInput";

// src/components/forms/bizuit-geolocation.tsx
import * as React10 from "react";
import { MapPin, Loader2, AlertCircle } from "lucide-react";
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var BizuitGeolocation = React10.forwardRef(
  ({
    value,
    onChange,
    label,
    description,
    showMap = false,
    className,
    disabled = false,
    required = false,
    error
  }, ref) => {
    const [loading, setLoading] = React10.useState(false);
    const [geoError, setGeoError] = React10.useState();
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setGeoError("Geolocalizaci\xF3n no soportada en este navegador");
        return;
      }
      setLoading(true);
      setGeoError(void 0);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          onChange?.(location);
          setLoading(false);
        },
        (error2) => {
          setGeoError(error2.message);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    };
    return /* @__PURE__ */ jsxs10("div", { ref, className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxs10("label", { className: "text-sm font-medium leading-none", children: [
        label,
        required && /* @__PURE__ */ jsx11("span", { className: "text-red-500 ml-1", children: "*" })
      ] }),
      description && /* @__PURE__ */ jsx11("p", { className: "text-sm text-muted-foreground", children: description }),
      /* @__PURE__ */ jsx11("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs10(
        Button,
        {
          type: "button",
          onClick: getCurrentLocation,
          disabled: disabled || loading,
          variant: "outline",
          className: "w-full",
          children: [
            loading ? /* @__PURE__ */ jsx11(Loader2, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsx11(MapPin, { className: "h-4 w-4 mr-2" }),
            loading ? "Obteniendo ubicaci\xF3n..." : "Obtener ubicaci\xF3n actual"
          ]
        }
      ) }),
      value && /* @__PURE__ */ jsxs10("div", { className: "p-4 border rounded-lg bg-card space-y-2", children: [
        /* @__PURE__ */ jsxs10("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
          /* @__PURE__ */ jsxs10("div", { children: [
            /* @__PURE__ */ jsx11("span", { className: "text-muted-foreground", children: "Latitud:" }),
            /* @__PURE__ */ jsx11("p", { className: "font-mono", children: value.latitude.toFixed(6) })
          ] }),
          /* @__PURE__ */ jsxs10("div", { children: [
            /* @__PURE__ */ jsx11("span", { className: "text-muted-foreground", children: "Longitud:" }),
            /* @__PURE__ */ jsx11("p", { className: "font-mono", children: value.longitude.toFixed(6) })
          ] }),
          value.accuracy && /* @__PURE__ */ jsxs10("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx11("span", { className: "text-muted-foreground", children: "Precisi\xF3n:" }),
            /* @__PURE__ */ jsxs10("p", { className: "font-mono", children: [
              value.accuracy.toFixed(2),
              " metros"
            ] })
          ] })
        ] }),
        showMap && /* @__PURE__ */ jsx11("div", { className: "mt-2", children: /* @__PURE__ */ jsx11(
          "a",
          {
            href: `https://www.google.com/maps?q=${value.latitude},${value.longitude}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm text-primary hover:underline",
            children: "Ver en Google Maps"
          }
        ) })
      ] }),
      (geoError || error) && /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2 text-sm text-red-500", children: [
        /* @__PURE__ */ jsx11(AlertCircle, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx11("span", { children: geoError || error })
      ] })
    ] });
  }
);
BizuitGeolocation.displayName = "BizuitGeolocation";

// src/components/forms/bizuit-subform.tsx
import * as React11 from "react";
import { Plus, Trash2 } from "lucide-react";
import { jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
var BizuitSubForm = React11.forwardRef(
  ({
    fields,
    value = [],
    onChange,
    label,
    description,
    maxRows = 10,
    minRows = 0,
    className,
    disabled = false
  }, ref) => {
    const addRow = () => {
      if (value.length >= maxRows) return;
      const newRow = {
        id: `row-${Date.now()}`
      };
      fields.forEach((field) => {
        newRow[field.name] = "";
      });
      onChange?.([...value, newRow]);
    };
    const removeRow = (id) => {
      if (value.length <= minRows) return;
      onChange?.(value.filter((row) => row.id !== id));
    };
    const updateRow = (id, fieldName, fieldValue) => {
      onChange?.(
        value.map(
          (row) => row.id === id ? { ...row, [fieldName]: fieldValue } : row
        )
      );
    };
    return /* @__PURE__ */ jsxs11("div", { ref, className: cn("space-y-4", className), children: [
      label && /* @__PURE__ */ jsx12("label", { className: "text-sm font-medium leading-none", children: label }),
      description && /* @__PURE__ */ jsx12("p", { className: "text-sm text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxs11("div", { className: "border rounded-lg overflow-hidden", children: [
        value.length > 0 && /* @__PURE__ */ jsx12("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs11("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx12("thead", { className: "bg-muted border-b", children: /* @__PURE__ */ jsxs11("tr", { children: [
            fields.map((field) => /* @__PURE__ */ jsxs11(
              "th",
              {
                className: "text-left p-3 text-sm font-medium",
                children: [
                  field.label,
                  field.required && /* @__PURE__ */ jsx12("span", { className: "text-red-500 ml-1", children: "*" })
                ]
              },
              field.name
            )),
            /* @__PURE__ */ jsx12("th", { className: "w-16" })
          ] }) }),
          /* @__PURE__ */ jsx12("tbody", { children: value.map((row, rowIndex) => /* @__PURE__ */ jsxs11("tr", { className: "border-b last:border-b-0", children: [
            fields.map((field) => /* @__PURE__ */ jsx12("td", { className: "p-2", children: field.type === "select" ? /* @__PURE__ */ jsxs11(
              "select",
              {
                value: row[field.name] || "",
                onChange: (e) => updateRow(row.id, field.name, e.target.value),
                disabled,
                className: "w-full px-3 py-2 border rounded-md bg-background",
                children: [
                  /* @__PURE__ */ jsx12("option", { value: "", children: "Seleccionar..." }),
                  field.options?.map((opt) => /* @__PURE__ */ jsx12("option", { value: opt.value, children: opt.label }, opt.value))
                ]
              }
            ) : /* @__PURE__ */ jsx12(
              "input",
              {
                type: field.type,
                value: row[field.name] || "",
                onChange: (e) => updateRow(row.id, field.name, e.target.value),
                disabled,
                className: "w-full px-3 py-2 border rounded-md bg-background"
              }
            ) }, field.name)),
            /* @__PURE__ */ jsx12("td", { className: "p-2", children: /* @__PURE__ */ jsx12(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => removeRow(row.id),
                disabled: disabled || value.length <= minRows,
                children: /* @__PURE__ */ jsx12(Trash2, { className: "h-4 w-4 text-destructive" })
              }
            ) })
          ] }, row.id)) })
        ] }) }),
        value.length === 0 && /* @__PURE__ */ jsx12("div", { className: "p-8 text-center text-muted-foreground", children: "No hay filas agregadas" })
      ] }),
      /* @__PURE__ */ jsxs11(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: addRow,
          disabled: disabled || value.length >= maxRows,
          className: "w-full",
          children: [
            /* @__PURE__ */ jsx12(Plus, { className: "h-4 w-4 mr-2" }),
            "Agregar fila"
          ]
        }
      ),
      value.length >= maxRows && /* @__PURE__ */ jsxs11("p", { className: "text-xs text-muted-foreground", children: [
        "M\xE1ximo ",
        maxRows,
        " filas permitidas"
      ] })
    ] });
  }
);
BizuitSubForm.displayName = "BizuitSubForm";

// src/components/layout/bizuit-tabs.tsx
import * as React12 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var BizuitTabs = React12.forwardRef(
  ({
    items,
    defaultValue,
    value,
    onChange,
    orientation = "horizontal",
    className,
    variant = "default"
  }, ref) => {
    return /* @__PURE__ */ jsxs12(
      TabsPrimitive.Root,
      {
        ref,
        className: cn("w-full", className),
        defaultValue: defaultValue || items[0]?.value,
        value,
        onValueChange: onChange,
        orientation,
        children: [
          /* @__PURE__ */ jsx13(
            TabsPrimitive.List,
            {
              className: cn(
                "inline-flex items-center justify-start",
                orientation === "horizontal" ? "h-10 rounded-md bg-muted p-1 text-muted-foreground w-full" : "flex-col h-auto space-y-1 w-48",
                variant === "underline" && "bg-transparent p-0 border-b",
                variant === "pills" && "bg-transparent p-0 gap-2"
              ),
              children: items.map((item) => /* @__PURE__ */ jsxs12(
                TabsPrimitive.Trigger,
                {
                  value: item.value,
                  disabled: item.disabled,
                  className: cn(
                    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5",
                    "text-sm font-medium ring-offset-background transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    // Default variant
                    variant === "default" && "rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                    // Pills variant
                    variant === "pills" && "rounded-full border border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                    // Underline variant
                    variant === "underline" && "border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-foreground",
                    orientation === "vertical" && "w-full justify-start"
                  ),
                  children: [
                    item.icon && /* @__PURE__ */ jsx13("span", { className: "mr-2", children: item.icon }),
                    item.label
                  ]
                },
                item.value
              ))
            }
          ),
          items.map((item) => /* @__PURE__ */ jsx13(
            TabsPrimitive.Content,
            {
              value: item.value,
              className: cn(
                "mt-2 ring-offset-background focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              ),
              children: item.content
            },
            item.value
          ))
        ]
      }
    );
  }
);
BizuitTabs.displayName = "BizuitTabs";

// src/components/layout/bizuit-card.tsx
import * as React13 from "react";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var BizuitCard = React13.forwardRef(
  ({
    className,
    title,
    description,
    header,
    footer,
    children,
    variant = "default",
    hoverable = false,
    clickable = false,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs13(
      "div",
      {
        ref,
        className: cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          variant === "outline" && "border-2",
          variant === "filled" && "bg-muted border-none",
          hoverable && "transition-shadow hover:shadow-md",
          clickable && "cursor-pointer transition-all hover:scale-[1.02]",
          className
        ),
        ...props,
        children: [
          header && /* @__PURE__ */ jsx14("div", { className: "p-6 pb-0", children: header }),
          (title || description) && /* @__PURE__ */ jsxs13("div", { className: cn("p-6", header && "pt-2", footer && children && "pb-0"), children: [
            title && /* @__PURE__ */ jsx14("h3", { className: "text-2xl font-semibold leading-none tracking-tight", children: title }),
            description && /* @__PURE__ */ jsx14("p", { className: "text-sm text-muted-foreground mt-1.5", children: description })
          ] }),
          children && /* @__PURE__ */ jsx14("div", { className: cn("p-6", (title || description) && "pt-0"), children }),
          footer && /* @__PURE__ */ jsx14("div", { className: "flex items-center p-6 pt-0", children: footer })
        ]
      }
    );
  }
);
BizuitCard.displayName = "BizuitCard";

// src/components/layout/bizuit-stepper.tsx
import * as React14 from "react";
import { Check as Check2 } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
var BizuitStepper = React14.forwardRef(
  ({
    steps,
    currentStep,
    onChange,
    orientation = "horizontal",
    clickable = false,
    className
  }, ref) => {
    const handleStepClick = (index) => {
      if (clickable && onChange) {
        onChange(index);
      }
    };
    return /* @__PURE__ */ jsx15(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "flex-row items-center" : "flex-col",
          className
        ),
        children: steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;
          return /* @__PURE__ */ jsxs14(React14.Fragment, { children: [
            /* @__PURE__ */ jsxs14(
              "div",
              {
                className: cn(
                  "flex items-center",
                  orientation === "vertical" && "w-full"
                ),
                children: [
                  /* @__PURE__ */ jsx15(
                    "div",
                    {
                      className: cn(
                        "flex items-center justify-center rounded-full border-2 transition-all",
                        "min-w-[40px] w-10 h-10",
                        isCompleted && "bg-primary border-primary text-primary-foreground",
                        isCurrent && "border-primary text-primary",
                        isUpcoming && "border-muted-foreground/30 text-muted-foreground",
                        clickable && "cursor-pointer hover:scale-110"
                      ),
                      onClick: () => handleStepClick(index),
                      children: isCompleted ? /* @__PURE__ */ jsx15(Check2, { className: "h-5 w-5" }) : step.icon ? step.icon : /* @__PURE__ */ jsx15("span", { className: "text-sm font-semibold", children: index + 1 })
                    }
                  ),
                  /* @__PURE__ */ jsxs14(
                    "div",
                    {
                      className: cn(
                        "ml-3",
                        orientation === "horizontal" && "max-w-[150px]"
                      ),
                      children: [
                        /* @__PURE__ */ jsx15(
                          "div",
                          {
                            className: cn(
                              "text-sm font-medium",
                              isCurrent && "text-foreground",
                              (isCompleted || isUpcoming) && "text-muted-foreground"
                            ),
                            children: step.label
                          }
                        ),
                        step.description && /* @__PURE__ */ jsx15("div", { className: "text-xs text-muted-foreground mt-0.5", children: step.description })
                      ]
                    }
                  )
                ]
              }
            ),
            index < steps.length - 1 && /* @__PURE__ */ jsx15(
              "div",
              {
                className: cn(
                  "bg-muted-foreground/30",
                  orientation === "horizontal" ? "h-[2px] flex-1 mx-4" : "w-[2px] h-12 ml-5 my-2",
                  isCompleted && "bg-primary"
                )
              }
            )
          ] }, index);
        })
      }
    );
  }
);
BizuitStepper.displayName = "BizuitStepper";

// src/components/media/bizuit-media.tsx
import * as React15 from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Camera, RotateCw, X as X4, QrCode } from "lucide-react";
import { Fragment as Fragment2, jsx as jsx16, jsxs as jsxs15 } from "react/jsx-runtime";
var BizuitMedia = React15.forwardRef(
  ({
    src,
    type,
    alt = "Media content",
    width,
    height,
    controls = true,
    autoPlay = false,
    loop = false,
    muted = false,
    className,
    onLoad,
    onError,
    onCapture,
    onQRCodeDetected,
    facingMode = "environment"
  }, ref) => {
    const [isPlaying, setIsPlaying] = React15.useState(autoPlay);
    const [isMuted, setIsMuted] = React15.useState(muted);
    const [isCameraActive, setIsCameraActive] = React15.useState(false);
    const [capturedImage, setCapturedImage] = React15.useState(null);
    const [currentFacingMode, setCurrentFacingMode] = React15.useState(facingMode);
    const [qrDetected, setQrDetected] = React15.useState(null);
    const mediaRef = React15.useRef(null);
    const cameraVideoRef = React15.useRef(null);
    const canvasRef = React15.useRef(null);
    const streamRef = React15.useRef(null);
    const qrScanIntervalRef = React15.useRef(null);
    React15.useEffect(() => {
      return () => {
        stopCamera();
      };
    }, []);
    const stopCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (qrScanIntervalRef.current) {
        clearInterval(qrScanIntervalRef.current);
        qrScanIntervalRef.current = null;
      }
      setIsCameraActive(false);
    };
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: currentFacingMode },
          audio: false
        });
        if (cameraVideoRef.current) {
          cameraVideoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsCameraActive(true);
          if (type === "qr-scanner") {
            startQRScanning();
          }
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        onError?.();
      }
    };
    const startQRScanning = () => {
      if (!cameraVideoRef.current || !canvasRef.current) return;
      const video = cameraVideoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      qrScanIntervalRef.current = setInterval(() => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = detectQRCode(imageData);
          if (code) {
            setQrDetected(code);
            onQRCodeDetected?.(code);
            stopCamera();
          }
        }
      }, 100);
    };
    const detectQRCode = (imageData) => {
      try {
        if (typeof window !== "undefined" && window.jsQR) {
          const code = window.jsQR(imageData.data, imageData.width, imageData.height);
          return code ? code.data : null;
        }
      } catch (err) {
        console.error("QR detection error:", err);
      }
      return null;
    };
    const capturePhoto = () => {
      if (!cameraVideoRef.current || !canvasRef.current) return;
      const video = cameraVideoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      onCapture?.(dataUrl);
      stopCamera();
    };
    const retakePhoto = () => {
      setCapturedImage(null);
      startCamera();
    };
    const switchCamera = async () => {
      stopCamera();
      setCurrentFacingMode((prev) => prev === "user" ? "environment" : "user");
      setTimeout(() => {
        startCamera();
      }, 100);
    };
    const togglePlay = () => {
      if (mediaRef.current) {
        if (isPlaying) {
          mediaRef.current.pause();
        } else {
          mediaRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
    const toggleMute = () => {
      if (mediaRef.current) {
        mediaRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };
    const toggleFullscreen = () => {
      if (mediaRef.current && "requestFullscreen" in mediaRef.current) {
        mediaRef.current.requestFullscreen();
      }
    };
    if (type === "image") {
      return /* @__PURE__ */ jsx16("div", { ref, className: cn("relative overflow-hidden rounded-lg", className), children: /* @__PURE__ */ jsx16(
        "img",
        {
          src,
          alt,
          width,
          height,
          onLoad,
          onError,
          className: "w-full h-full object-cover"
        }
      ) });
    }
    if (type === "video") {
      return /* @__PURE__ */ jsxs15("div", { ref, className: cn("relative overflow-hidden rounded-lg bg-black", className), style: { width, height }, children: [
        /* @__PURE__ */ jsx16(
          "video",
          {
            ref: mediaRef,
            src,
            autoPlay,
            loop,
            muted,
            onLoadedData: onLoad,
            onError,
            className: "w-full h-full object-contain",
            controls
          }
        ),
        !controls && /* @__PURE__ */ jsxs15("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: togglePlay,
              className: "text-white hover:text-primary transition-colors",
              "aria-label": isPlaying ? "Pause" : "Play",
              children: isPlaying ? /* @__PURE__ */ jsx16(Pause, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx16(Play, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: toggleMute,
              className: "text-white hover:text-primary transition-colors",
              "aria-label": isMuted ? "Unmute" : "Mute",
              children: isMuted ? /* @__PURE__ */ jsx16(VolumeX, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx16(Volume2, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: toggleFullscreen,
              className: "text-white hover:text-primary transition-colors ml-auto",
              "aria-label": "Fullscreen",
              children: /* @__PURE__ */ jsx16(Maximize, { className: "h-6 w-6" })
            }
          )
        ] })
      ] });
    }
    if (type === "audio") {
      return /* @__PURE__ */ jsx16("div", { ref, className: cn("rounded-lg bg-card border p-4", className), children: /* @__PURE__ */ jsx16(
        "audio",
        {
          ref: mediaRef,
          src,
          autoPlay,
          loop,
          muted,
          onLoadedData: onLoad,
          onError,
          controls,
          className: "w-full"
        }
      ) });
    }
    if (type === "camera") {
      return /* @__PURE__ */ jsxs15("div", { ref, className: cn("relative overflow-hidden rounded-lg bg-black", className), style: { width: width || "100%", height: height || 400 }, children: [
        /* @__PURE__ */ jsx16("canvas", { ref: canvasRef, className: "hidden" }),
        !isCameraActive && !capturedImage && /* @__PURE__ */ jsx16("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxs15(
          "button",
          {
            onClick: startCamera,
            className: "flex flex-col items-center gap-2 text-white hover:text-primary transition-colors",
            children: [
              /* @__PURE__ */ jsx16(Camera, { className: "h-12 w-12" }),
              /* @__PURE__ */ jsx16("span", { children: "Activar C\xE1mara" })
            ]
          }
        ) }),
        isCameraActive && !capturedImage && /* @__PURE__ */ jsxs15(Fragment2, { children: [
          /* @__PURE__ */ jsx16(
            "video",
            {
              ref: cameraVideoRef,
              autoPlay: true,
              playsInline: true,
              muted: true,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxs15("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx16(
              "button",
              {
                onClick: switchCamera,
                className: "text-white hover:text-primary transition-colors",
                "aria-label": "Switch camera",
                children: /* @__PURE__ */ jsx16(RotateCw, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx16(
              "button",
              {
                onClick: capturePhoto,
                className: "bg-white rounded-full p-4 hover:bg-gray-200 transition-colors",
                "aria-label": "Capture photo",
                children: /* @__PURE__ */ jsx16(Camera, { className: "h-8 w-8 text-black" })
              }
            ),
            /* @__PURE__ */ jsx16(
              "button",
              {
                onClick: stopCamera,
                className: "text-white hover:text-primary transition-colors",
                "aria-label": "Close camera",
                children: /* @__PURE__ */ jsx16(X4, { className: "h-6 w-6" })
              }
            )
          ] })
        ] }),
        capturedImage && /* @__PURE__ */ jsxs15(Fragment2, { children: [
          /* @__PURE__ */ jsx16("img", { src: capturedImage, alt: "Captured", className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsx16("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-center gap-4", children: /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: retakePhoto,
              className: "bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors",
              children: "Tomar otra foto"
            }
          ) })
        ] })
      ] });
    }
    if (type === "qr-scanner") {
      return /* @__PURE__ */ jsxs15("div", { ref, className: cn("relative overflow-hidden rounded-lg bg-black", className), style: { width: width || "100%", height: height || 400 }, children: [
        /* @__PURE__ */ jsx16("canvas", { ref: canvasRef, className: "hidden" }),
        !isCameraActive && !qrDetected && /* @__PURE__ */ jsx16("div", { className: "flex items-center justify-center h-full", children: /* @__PURE__ */ jsxs15(
          "button",
          {
            onClick: startCamera,
            className: "flex flex-col items-center gap-2 text-white hover:text-primary transition-colors",
            children: [
              /* @__PURE__ */ jsx16(QrCode, { className: "h-12 w-12" }),
              /* @__PURE__ */ jsx16("span", { children: "Escanear C\xF3digo QR" })
            ]
          }
        ) }),
        isCameraActive && !qrDetected && /* @__PURE__ */ jsxs15(Fragment2, { children: [
          /* @__PURE__ */ jsx16(
            "video",
            {
              ref: cameraVideoRef,
              autoPlay: true,
              playsInline: true,
              muted: true,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx16("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx16("div", { className: "border-4 border-primary w-64 h-64 rounded-lg" }) }),
          /* @__PURE__ */ jsx16("div", { className: "absolute top-4 left-0 right-0 text-center", children: /* @__PURE__ */ jsx16("p", { className: "text-white bg-black/50 inline-block px-4 py-2 rounded-md", children: "Coloca el c\xF3digo QR dentro del recuadro" }) }),
          /* @__PURE__ */ jsx16("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-center", children: /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: stopCamera,
              className: "text-white hover:text-primary transition-colors",
              "aria-label": "Close scanner",
              children: /* @__PURE__ */ jsx16(X4, { className: "h-6 w-6" })
            }
          ) })
        ] }),
        qrDetected && /* @__PURE__ */ jsxs15("div", { className: "flex flex-col items-center justify-center h-full p-8 text-center", children: [
          /* @__PURE__ */ jsx16("div", { className: "bg-green-500 text-white p-4 rounded-full mb-4", children: /* @__PURE__ */ jsx16(QrCode, { className: "h-12 w-12" }) }),
          /* @__PURE__ */ jsx16("h3", { className: "text-white text-xl font-semibold mb-2", children: "\xA1C\xF3digo QR detectado!" }),
          /* @__PURE__ */ jsx16("p", { className: "text-gray-300 mb-4 break-all max-w-md", children: qrDetected }),
          /* @__PURE__ */ jsx16(
            "button",
            {
              onClick: () => {
                setQrDetected(null);
                startCamera();
              },
              className: "bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors",
              children: "Escanear otro c\xF3digo"
            }
          )
        ] })
      ] });
    }
    return null;
  }
);
BizuitMedia.displayName = "BizuitMedia";

// src/components/media/bizuit-iframe.tsx
import * as React16 from "react";
import { Loader2 as Loader22 } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs16 } from "react/jsx-runtime";
var BizuitIFrame = React16.forwardRef(
  ({
    src,
    title,
    width = "100%",
    height = 500,
    loading = "lazy",
    showLoader = true,
    onLoad,
    onError,
    className,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = React16.useState(showLoader);
    const [hasError, setHasError] = React16.useState(false);
    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };
    return /* @__PURE__ */ jsxs16("div", { className: cn("relative w-full", className), style: { width, height }, children: [
      isLoading && showLoader && /* @__PURE__ */ jsx17("div", { className: "absolute inset-0 flex items-center justify-center bg-muted rounded-lg border", children: /* @__PURE__ */ jsx17(Loader22, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }),
      hasError && /* @__PURE__ */ jsx17("div", { className: "absolute inset-0 flex items-center justify-center bg-muted rounded-lg border", children: /* @__PURE__ */ jsxs16("div", { className: "text-center p-6", children: [
        /* @__PURE__ */ jsx17("p", { className: "text-sm font-medium text-muted-foreground", children: "Error al cargar el contenido" }),
        /* @__PURE__ */ jsxs16("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "No se pudo cargar: ",
          src
        ] })
      ] }) }),
      /* @__PURE__ */ jsx17(
        "iframe",
        {
          ref,
          src,
          title,
          width: "100%",
          height: "100%",
          loading,
          onLoad: handleLoad,
          onError: handleError,
          className: cn(
            "rounded-lg border bg-background",
            isLoading && "opacity-0",
            hasError && "hidden"
          ),
          ...props
        }
      )
    ] });
  }
);
BizuitIFrame.displayName = "BizuitIFrame";

// src/providers/theme-provider.tsx
import * as React17 from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
var initialState = {
  theme: "system",
  setTheme: () => null,
  colorTheme: "blue",
  setColorTheme: () => null,
  language: "es",
  setLanguage: () => null
};
var ThemeProviderContext = React17.createContext(initialState);
function BizuitThemeProvider({
  children,
  defaultTheme = "system",
  defaultColorTheme = "blue",
  defaultLanguage = "es",
  storageKey = "bizuit-ui-theme",
  colorStorageKey = "bizuit-ui-color-theme",
  languageStorageKey = "bizuit-ui-language",
  ...props
}) {
  const [theme, setTheme] = React17.useState(
    () => typeof window !== "undefined" && localStorage.getItem(storageKey) || defaultTheme
  );
  const [colorTheme, setColorTheme] = React17.useState(
    () => typeof window !== "undefined" && localStorage.getItem(colorStorageKey) || defaultColorTheme
  );
  const [language, setLanguage] = React17.useState(
    () => typeof window !== "undefined" && localStorage.getItem(languageStorageKey) || defaultLanguage
  );
  React17.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  React17.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-blue", "theme-green", "theme-purple", "theme-orange", "theme-red", "theme-slate");
    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);
  React17.useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("lang", language);
  }, [language]);
  const value = {
    theme,
    setTheme: (theme2) => {
      localStorage.setItem(storageKey, theme2);
      setTheme(theme2);
    },
    colorTheme,
    setColorTheme: (colorTheme2) => {
      localStorage.setItem(colorStorageKey, colorTheme2);
      setColorTheme(colorTheme2);
    },
    language,
    setLanguage: (language2) => {
      localStorage.setItem(languageStorageKey, language2);
      setLanguage(language2);
    }
  };
  return /* @__PURE__ */ jsx18(ThemeProviderContext.Provider, { ...props, value, children });
}
var useBizuitTheme = () => {
  const context = React17.useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useBizuitTheme must be used within a BizuitThemeProvider");
  return context;
};

// src/providers/theme-toggle.tsx
import * as React18 from "react";
import { Moon, Sun } from "lucide-react";
import { jsx as jsx19, jsxs as jsxs17 } from "react/jsx-runtime";
function ThemeToggle() {
  const { theme, setTheme } = useBizuitTheme();
  const [mounted, setMounted] = React18.useState(false);
  React18.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return /* @__PURE__ */ jsx19(Button, { variant: "ghost", size: "icon", disabled: true, children: /* @__PURE__ */ jsx19(Sun, { className: "h-5 w-5" }) });
  }
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };
  const getIcon = () => {
    if (theme === "dark") {
      return /* @__PURE__ */ jsx19(Moon, { className: "h-5 w-5" });
    } else if (theme === "light") {
      return /* @__PURE__ */ jsx19(Sun, { className: "h-5 w-5" });
    } else {
      return /* @__PURE__ */ jsxs17("div", { className: "relative h-5 w-5", children: [
        /* @__PURE__ */ jsx19(Sun, { className: "h-5 w-5 absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx19(Moon, { className: "h-5 w-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })
      ] });
    }
  };
  const getLabel = () => {
    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "System";
  };
  return /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxs17(
      Button,
      {
        variant: "ghost",
        size: "icon",
        onClick: toggleTheme,
        title: `Current theme: ${getLabel()}. Click to cycle.`,
        children: [
          getIcon(),
          /* @__PURE__ */ jsx19("span", { className: "sr-only", children: "Toggle theme" })
        ]
      }
    ),
    /* @__PURE__ */ jsx19("span", { className: "text-sm text-muted-foreground hidden sm:inline", children: getLabel() })
  ] });
}

// src/providers/color-theme-selector.tsx
import * as React19 from "react";
import { Palette } from "lucide-react";
import * as PopoverPrimitive3 from "@radix-ui/react-popover";
import { jsx as jsx20, jsxs as jsxs18 } from "react/jsx-runtime";
var colorThemes = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "slate", label: "Slate", color: "bg-slate-500" }
];
function ColorThemeSelector() {
  const { colorTheme, setColorTheme } = useBizuitTheme();
  const [open, setOpen] = React19.useState(false);
  const [mounted, setMounted] = React19.useState(false);
  React19.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const currentTheme = colorThemes.find((t) => t.value === colorTheme);
  return /* @__PURE__ */ jsxs18(PopoverPrimitive3.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx20(PopoverPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs18(
      "button",
      {
        className: "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        title: "Select color theme",
        children: [
          /* @__PURE__ */ jsx20(Palette, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx20("span", { className: "hidden sm:inline", children: currentTheme?.label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx20(PopoverPrimitive3.Portal, { children: /* @__PURE__ */ jsx20(
      PopoverPrimitive3.Content,
      {
        align: "end",
        sideOffset: 4,
        className: cn(
          "z-50 min-w-[200px] rounded-md border bg-popover p-2 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        ),
        children: /* @__PURE__ */ jsx20("div", { className: "space-y-1", children: colorThemes.map((theme) => /* @__PURE__ */ jsxs18(
          "button",
          {
            onClick: () => {
              setColorTheme(theme.value);
              setOpen(false);
            },
            className: cn(
              "flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              colorTheme === theme.value && "bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsx20("div", { className: cn("h-4 w-4 rounded-full", theme.color) }),
              /* @__PURE__ */ jsx20("span", { children: theme.label }),
              colorTheme === theme.value && /* @__PURE__ */ jsx20("span", { className: "ml-auto text-xs", children: "\u2713" })
            ]
          },
          theme.value
        )) })
      }
    ) })
  ] });
}

// src/providers/language-selector.tsx
import * as React20 from "react";
import { Languages } from "lucide-react";
import * as PopoverPrimitive4 from "@radix-ui/react-popover";
import { jsx as jsx21, jsxs as jsxs19 } from "react/jsx-runtime";
var languages = [
  { value: "es", label: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}" },
  { value: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" }
];
function LanguageSelector() {
  const { language, setLanguage } = useBizuitTheme();
  const [open, setOpen] = React20.useState(false);
  const [mounted, setMounted] = React20.useState(false);
  React20.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const currentLang = languages.find((l) => l.value === language);
  return /* @__PURE__ */ jsxs19(PopoverPrimitive4.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx21(PopoverPrimitive4.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs19(
      "button",
      {
        className: "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        title: "Select language",
        children: [
          /* @__PURE__ */ jsx21(Languages, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxs19("span", { className: "hidden sm:inline", children: [
            currentLang?.flag,
            " ",
            currentLang?.label
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx21(PopoverPrimitive4.Portal, { children: /* @__PURE__ */ jsx21(
      PopoverPrimitive4.Content,
      {
        align: "end",
        sideOffset: 4,
        className: cn(
          "z-50 min-w-[180px] rounded-md border bg-popover p-2 text-popover-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        ),
        children: /* @__PURE__ */ jsx21("div", { className: "space-y-1", children: languages.map((lang) => /* @__PURE__ */ jsxs19(
          "button",
          {
            onClick: () => {
              setLanguage(lang.value);
              setOpen(false);
            },
            className: cn(
              "flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              language === lang.value && "bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsx21("span", { className: "text-lg", children: lang.flag }),
              /* @__PURE__ */ jsx21("span", { children: lang.label }),
              language === lang.value && /* @__PURE__ */ jsx21("span", { className: "ml-auto text-xs", children: "\u2713" })
            ]
          },
          lang.value
        )) })
      }
    ) })
  ] });
}

// src/providers/translations.ts
var translations = {
  en: {
    // Navigation
    "nav.backToHome": "\u2190 Back to home",
    // Home Page
    "home.title": "Bizuit Form Example",
    "home.startProcess": "Start Process",
    "home.startProcess.description": "Create a new process instance in Bizuit BPM",
    "home.continueProcess": "Continue Process",
    "home.continueProcess.description": "Continue an existing instance with pessimistic locking",
    "home.components.title": "Available Components",
    "home.components.description": "Try all components interactively",
    "home.components.demo": "View Interactive Demo",
    "home.packages.title": "Packages Used:",
    "home.examples.title": "Form Implementation Examples",
    "home.examples.description": "Three different approaches to building forms with Bizuit BPM",
    "home.example1.title": "1. Dynamic Fields",
    "home.example1.description": "Auto-generate fields from API. Best for generic forms.",
    "home.example1.uses": "Uses: DynamicFormField + formDataToParameters()",
    "home.example2.title": "2. Manual + Send All",
    "home.example2.description": "Custom UI, sends all form data. Good for simple forms.",
    "home.example2.uses": "Uses: HTML inputs + formDataToParameters()",
    "home.example3.title": "3. Manual + Selective",
    "home.example3.description": "Custom UI, selective mapping with transformations.",
    "home.example3.uses": "Uses: HTML inputs + buildParameters()",
    "home.example3.badge": "BEST PRACTICE",
    // Components Demo
    "demo.title": "Components Demonstration",
    "demo.description": "Try all @bizuit/ui-components components interactively",
    "demo.combo.title": "BizuitCombo",
    "demo.combo.description": "Select with incremental search and grouping",
    "demo.combo.placeholder": "Select an option",
    "demo.combo.selected": "Selected value:",
    "demo.datePicker.title": "BizuitDateTimePicker",
    "demo.datePicker.description": "Date and time picker with language support",
    "demo.datePicker.selected": "Selected date:",
    "demo.slider.title": "BizuitSlider",
    "demo.slider.description": "Slider control with marks and tooltip",
    "demo.slider.current": "Current value:",
    "demo.fileUpload.title": "BizuitFileUpload",
    "demo.fileUpload.description": "File upload with drag & drop and preview",
    "demo.fileUpload.selected": "Selected files:",
    "demo.dataGrid.title": "BizuitDataGrid",
    "demo.dataGrid.description": "Table with sorting, filtering and pagination",
    "demo.button.title": "Button",
    "demo.button.description": "Buttons with different variants and sizes",
    "demo.reset.title": "Reset Demos",
    "demo.reset.description": "Clear all selected values",
    "demo.reset.button": "Reset All",
    "demo.tip.title": "\u{1F4A1} Tip",
    "demo.tip.description": "All these components are fully customizable with Tailwind CSS and support dark mode automatically. You can see the source code at",
    // Buttons
    "button.default": "Default",
    "button.secondary": "Secondary",
    "button.destructive": "Destructive",
    "button.outline": "Outline",
    "button.ghost": "Ghost",
    "button.link": "Link",
    "button.small": "Small",
    "button.large": "Large",
    "button.disabled": "Disabled",
    "button.clickMe": "Click Me",
    "button.clicked": "Button clicked!",
    // Start Process
    "startProcess.title": "Start Process",
    "startProcess.processId": "Process ID",
    "startProcess.processId.placeholder": "E.g.: PROC-001",
    "startProcess.token": "Authentication Token",
    "startProcess.token.placeholder": "Enter JWT token",
    "startProcess.authenticate": "Authenticate and Initialize",
    "startProcess.authenticating": "Authenticating...",
    "startProcess.note": "Note:",
    "startProcess.note.description": "In a real environment, the token would come as a URL parameter from the Bizuit BPMS. This screen is for demonstration purposes only.",
    "startProcess.eventNameFromUrl": "Event name received from URL",
    // Continue Process
    "continueProcess.title": "Continue Process",
    "continueProcess.instanceId": "Instance ID",
    "continueProcess.instanceId.placeholder": "E.g.: INST-12345",
    "continueProcess.authenticateAndLock": "Authenticate and Lock Instance",
    "continueProcess.authenticating": "Authenticating and Locking...",
    "continueProcess.pessimisticLocking": "Pessimistic Locking:",
    "continueProcess.pessimisticLocking.description": "This functionality implements pessimistic locking to ensure only one user can edit the instance at a time.",
    "continueProcess.pessimisticLocking.release": "The lock will be automatically released when submitting the form or canceling the edit.",
    // Login
    "login.title": "Login to Bizuit",
    "login.username": "Username",
    "login.username.placeholder": "Enter your username",
    "login.password": "Password",
    "login.password.placeholder": "Enter your password",
    "login.submit": "Login",
    "login.submitting": "Logging in...",
    "login.error": "Login Error",
    "login.success": "Login Successful",
    "login.redirecting": "Redirecting...",
    // UI Common
    "ui.backToHome": "\u2190 Back to home",
    "ui.user": "User:",
    "ui.eventName": "Event Name",
    "ui.eventNameDescription": "Event name to continue the process",
    "ui.exampleUrl": "Example URL",
    "ui.liveEditorTip": "Edit the code in the left panel and you will see the changes IN REAL TIME in the right panel.",
    "ui.parameters": "Parameters",
    "ui.cancel": "Cancel",
    "ui.save": "Save",
    "ui.submit": "Submit",
    "ui.send": "Send",
    "ui.load": "Load",
    "ui.search": "Search",
    "ui.add": "Add",
    "ui.delete": "Delete",
    "ui.edit": "Edit",
    "ui.settings": "Settings",
    "ui.download": "Download",
    "ui.initiateProcess": "Start Process",
    "ui.initiatingProcess": "Starting Process...",
    "ui.processStarted": "Process started",
    "ui.back": "Back",
    "ui.next": "Next",
    "ui.finish": "Finish",
    "ui.close": "Close",
    "ui.configuration": "Configuration",
    "ui.parametersToSend": "Parameters to send:",
    "ui.formParameters": "Form parameters",
    "ui.hiddenParameters": "Hidden/calculated parameters",
    "ui.returnParameters": "Return Parameters:",
    "ui.processDataInitialized": "Initialized Process Data:",
    "ui.processStartedSuccessfully": "Process Started Successfully",
    "ui.processCreatedSuccessfully": "The process has been created successfully in Bizuit BPMS",
    "ui.processInformation": "Process Information:",
    "ui.startAnotherProcess": "Start Another Process",
    "ui.processForm": "Process Form:",
    "ui.noInputParametersFound": "No input parameters found for this process.",
    "ui.eventNameFromUrl": "Event name received from URL",
    "ui.retry": "Retry",
    "ui.loadInstanceData": "Load Instance Data",
    "ui.instanceData": "Instance Data",
    "ui.savingChanges": "Saving Changes...",
    "ui.saveAndContinue": "Save and Continue",
    "ui.visibleParameters": "Visible Parameters",
    "ui.hiddenCalculatedParameters": "Hidden/Calculated Parameters",
    "ui.totalParameters": "Total Parameters",
    "ui.sending": "Sending",
    "ui.enter": "Enter",
    "ui.example": "Example",
    "ui.optional": "optional",
    "ui.required": "required",
    "ui.processName": "Process Name",
    "ui.loadProcessParameters": "Load Process Parameters",
    "ui.loadingParameters": "Loading parameters...",
    "ui.description": "Description",
    "ui.useCases": "Use Cases",
    "ui.installation": "Installation",
    "ui.editCodeDescription": "Edit the code and see the changes in real time",
    "ui.viewSourceCode": "View source code for",
    "ui.inYourProject": "in your project",
    "ui.copy": "Copy",
    // Example 1 - Dynamic
    "example1.title": "Example 1: Dynamic Fields",
    "example1.description": "Fields are automatically generated from process parameters, all fields are sent",
    "example1.liveCodeTitle": "Interactive Editor - Dynamic Field Generation",
    "example1.liveCodeDescription": "This code simulates how fields are automatically generated from API parameters. Parameters are hardcoded for demonstration.",
    "example1.howItWorks": "How this example works",
    "example1.step1": "Get parameters dynamically:",
    "example1.step2": "Generate fields automatically:",
    "example1.step3": "Send all fields + hidden parameters:",
    "example1.idealFor": "Ideal for:",
    "example1.idealForText": "Generic forms, rapid prototypes, when you don't know the parameters beforehand",
    "example1.notIdealFor": "Not ideal for:",
    "example1.notIdealForText": "Custom UI, complex validations, selective field mapping",
    // Example 2 - Manual All
    "example2.title": "Example 2: Manual Fields + Send All",
    "example2.description": "Fields are manually created with full UI control, all values are sent",
    "example2.liveCodeTitle": "Interactive Live Editor",
    "example2.liveCodeDescription": "Edit the code in the left panel and see the changes IN REAL TIME in the right panel. Try changing placeholders, adding fields, modifying styles, etc.",
    "example2.howItWorks": "How this example works",
    "example2.step1": "Define fields manually:",
    "example2.step2": "Create inputs with full UI control:",
    "example2.step3": "Apply transformations to values:",
    "example2.step4": "Add hidden/calculated parameters:",
    "example2.step5": "Combine and send ALL fields:",
    "example2.idealFor": "Ideal for:",
    "example2.idealForText": "Forms with custom UI, specific validations, better UX",
    "example2.limitation": "Limitation:",
    "example2.limitationText": "Sends ALL fields even if some are not necessary for the process",
    "example2.seeExample3": "See Example 3",
    "example2.seeExample3Text": "to learn how to send only specific fields",
    // Example 3 - Selective Mapping
    "example3.title": "Example 3: Manual Fields + Selective Mapping",
    "example3.description": "Fields are manually created with full UI control, selectively choose which to send with transformations",
    "example3.liveCodeTitle": "Interactive Code - Selective Mapping",
    "example3.liveCodeDescription": "Edit the code and see the changes in real time. This example shows how to use buildParameters() to send only the necessary fields.",
    "example3.howItWorks": "How Selective Mapping Works",
    "example3.step1": "Define field mapping:",
    "example3.step2": "Build parameters selectively:",
    "example3.step3": "Add hidden/calculated parameters:",
    "example3.step4": "Combine and send to process:",
    "example3.note": "Note: commentariosInternos is not here, it won't be sent",
    "example3.onlyGenerates": "Only generates parameters for the fields in the mapping",
    "example3.notInForm": "Parameters that are NOT in the form",
    "example3.combine": "Combine visible + hidden parameters",
    "example3.visibleHidden": "visible + hidden = total",
    "example3.advantages.title": "Why is this the BEST PRACTICE?",
    "example3.advantages.1": "Full control over UI and validations",
    "example3.advantages.2": "Sends ONLY what's necessary (better performance)",
    "example3.advantages.3": "Transforms values before sending (uppercase, decimals, etc.)",
    "example3.advantages.4": "Maps form fields to different parameter names",
    "example3.advantages.5": "Distinguishes between parameters and variables (isVariable)",
    "example3.advantages.6": "Combines visible fields + hidden/calculated parameters",
    // Components Demo - Welcome Screen
    "welcome.title": "Bizuit UI Components",
    "welcome.subtitle": "A complete library of professional React components to build modern enterprise applications",
    "welcome.version": "v1.3.1 \u2022 @tyconsa/bizuit-ui-components",
    "welcome.totalComponents": "Total Components",
    "welcome.totalComponentsDesc": "From forms to data visualization",
    "welcome.categories": "Categories",
    "welcome.categoriesDesc": "UI, Forms, Layout, Media and Data",
    "welcome.typescript": "TypeScript",
    "welcome.typescriptDesc": "Complete types and autocomplete",
    "welcome.startExploring": "Start Exploring",
    "welcome.selectComponent": "Select a component from the sidebar to see:",
    "welcome.detailedDescription": "Detailed description",
    "welcome.detailedDescriptionText": "and use cases",
    "welcome.completeProps": "Complete props documentation",
    "welcome.completePropsText": "with types and default values",
    "welcome.interactiveExamples": "Interactive code examples",
    "welcome.interactiveExamplesText": "that you can edit in real-time",
    "welcome.quickInstall": "Quick Install",
    "welcome.thenImport": "Then import the components you need:",
    // Components Demo - Sidebar
    "sidebar.components": "Components",
    "sidebar.componentsAvailable": "components available",
    "sidebar.searchPlaceholder": "Search components...",
    "sidebar.noComponentsFound": "No components found",
    "sidebar.tryDifferentTerm": "Try a different search term",
    "sidebar.component": "component",
    "sidebar.components_plural": "components",
    // Components Demo - Categories
    "category.ui": "UI Components",
    "category.ui.desc": "Buttons, cards, and visual elements",
    "category.forms": "Form Components",
    "category.forms.desc": "Input fields and form controls",
    "category.layout": "Layout Components",
    "category.layout.desc": "Tabs, cards, and containers",
    "category.media": "Media Components",
    "category.media.desc": "Images, videos, and media players",
    "category.data": "Data Components",
    "category.data.desc": "Tables and data displays",
    // Components Demo - UI Labels
    "ui.overview": "Overview",
    "ui.props": "Props",
    "ui.liveExample": "Live Example",
    "ui.sourceCode": "Source Code",
    "ui.noPropsDocumented": "No props documented for this component.",
    "ui.componentName": "Name",
    "ui.componentType": "Type",
    "ui.componentRequired": "Required",
    "ui.componentDefault": "Default",
    "ui.componentDescription": "Description",
    "ui.yes": "Yes",
    "ui.no": "No"
  },
  es: {
    // Navigation
    "nav.backToHome": "\u2190 Volver al inicio",
    // Home Page
    "home.title": "Bizuit Form Example",
    "home.startProcess": "Iniciar Proceso",
    "home.startProcess.description": "Crear una nueva instancia de proceso en Bizuit BPM",
    "home.continueProcess": "Continuar Proceso",
    "home.continueProcess.description": "Continuar una instancia existente con bloqueo pesimista",
    "home.components.title": "Componentes Disponibles",
    "home.components.description": "Prueba todos los componentes de forma interactiva",
    "home.components.demo": "Ver Demo Interactiva",
    "home.packages.title": "Packages Utilizados:",
    "home.examples.title": "Ejemplos de Implementaci\xF3n de Formularios",
    "home.examples.description": "Tres enfoques diferentes para construir formularios con Bizuit BPM",
    "home.example1.title": "1. Campos Din\xE1micos",
    "home.example1.description": "Genera campos autom\xE1ticamente desde la API. Ideal para formularios gen\xE9ricos.",
    "home.example1.uses": "Usa: DynamicFormField + formDataToParameters()",
    "home.example2.title": "2. Manual + Enviar Todo",
    "home.example2.description": "UI personalizada, env\xEDa todos los datos del formulario. Bueno para formularios simples.",
    "home.example2.uses": "Usa: inputs HTML + formDataToParameters()",
    "home.example3.title": "3. Manual + Selectivo",
    "home.example3.description": "UI personalizada, mapeo selectivo con transformaciones.",
    "home.example3.uses": "Usa: inputs HTML + buildParameters()",
    "home.example3.badge": "MEJOR PR\xC1CTICA",
    // Components Demo
    "demo.title": "Demostraci\xF3n de Componentes",
    "demo.description": "Prueba todos los componentes de @bizuit/ui-components de forma interactiva",
    "demo.combo.title": "BizuitCombo",
    "demo.combo.description": "Select con b\xFAsqueda incremental y agrupaci\xF3n",
    "demo.combo.placeholder": "Selecciona una opci\xF3n",
    "demo.combo.selected": "Valor seleccionado:",
    "demo.datePicker.title": "BizuitDateTimePicker",
    "demo.datePicker.description": "Selector de fecha y hora con soporte de idiomas",
    "demo.datePicker.selected": "Fecha seleccionada:",
    "demo.slider.title": "BizuitSlider",
    "demo.slider.description": "Control deslizante con marcas y tooltip",
    "demo.slider.current": "Valor actual:",
    "demo.fileUpload.title": "BizuitFileUpload",
    "demo.fileUpload.description": "Carga de archivos con drag & drop y preview",
    "demo.fileUpload.selected": "Archivos seleccionados:",
    "demo.dataGrid.title": "BizuitDataGrid",
    "demo.dataGrid.description": "Tabla con ordenamiento, filtrado y paginaci\xF3n",
    "demo.button.title": "Button",
    "demo.button.description": "Botones con diferentes variantes y tama\xF1os",
    "demo.reset.title": "Resetear Demos",
    "demo.reset.description": "Limpia todos los valores seleccionados",
    "demo.reset.button": "Resetear Todo",
    "demo.tip.title": "\u{1F4A1} Tip",
    "demo.tip.description": "Todos estos componentes son completamente personalizables con Tailwind CSS y soportan dark mode autom\xE1ticamente. Puedes ver el c\xF3digo fuente en",
    // Buttons
    "button.default": "Default",
    "button.secondary": "Secondary",
    "button.destructive": "Destructive",
    "button.outline": "Outline",
    "button.ghost": "Ghost",
    "button.link": "Link",
    "button.small": "Small",
    "button.large": "Large",
    "button.disabled": "Disabled",
    "button.clickMe": "Click Me",
    "button.clicked": "\xA1Bot\xF3n clickeado!",
    // Start Process
    "startProcess.title": "Iniciar Proceso",
    "startProcess.processId": "ID del Proceso",
    "startProcess.processId.placeholder": "Ej: PROC-001",
    "startProcess.token": "Token de Autenticaci\xF3n",
    "startProcess.token.placeholder": "Ingrese el token JWT",
    "startProcess.authenticate": "Autenticar e Inicializar",
    "startProcess.authenticating": "Autenticando...",
    "startProcess.note": "Nota:",
    "startProcess.note.description": "En un entorno real, el token vendr\xEDa como par\xE1metro de la URL desde el BPMS Bizuit. Esta pantalla es solo para prop\xF3sitos de demostraci\xF3n.",
    "startProcess.eventNameFromUrl": "Nombre del evento recibido desde la URL",
    // Continue Process
    "continueProcess.title": "Continuar Proceso",
    "continueProcess.instanceId": "ID de Instancia",
    "continueProcess.instanceId.placeholder": "Ej: INST-12345",
    "continueProcess.authenticateAndLock": "Autenticar y Bloquear Instancia",
    "continueProcess.authenticating": "Autenticando y Bloqueando...",
    "continueProcess.pessimisticLocking": "Bloqueo Pesimista:",
    "continueProcess.pessimisticLocking.description": "Esta funcionalidad implementa bloqueo pesimista para garantizar que solo un usuario pueda editar la instancia a la vez.",
    "continueProcess.pessimisticLocking.release": "El bloqueo se liberar\xE1 autom\xE1ticamente al enviar el formulario o cancelar la edici\xF3n.",
    // Login
    "login.title": "Iniciar Sesi\xF3n en Bizuit",
    "login.username": "Usuario",
    "login.username.placeholder": "Ingrese su usuario",
    "login.password": "Contrase\xF1a",
    "login.password.placeholder": "Ingrese su contrase\xF1a",
    "login.submit": "Iniciar Sesi\xF3n",
    "login.submitting": "Iniciando sesi\xF3n...",
    "login.error": "Error de Login",
    "login.success": "Login Exitoso",
    "login.redirecting": "Redirigiendo...",
    // UI Common
    "ui.backToHome": "\u2190 Volver al inicio",
    "ui.user": "Usuario:",
    "ui.eventName": "Nombre del evento",
    "ui.eventNameDescription": "Nombre del evento para continuar el proceso",
    "ui.exampleUrl": "URL de ejemplo",
    "ui.liveEditorTip": "Edita el c\xF3digo en el panel izquierdo y ver\xE1s los cambios EN TIEMPO REAL en el panel derecho.",
    "ui.parameters": "Par\xE1metros",
    "ui.cancel": "Cancelar",
    "ui.save": "Guardar",
    "ui.submit": "Enviar",
    "ui.send": "Enviar",
    "ui.load": "Cargar",
    "ui.search": "Buscar",
    "ui.add": "Agregar",
    "ui.delete": "Eliminar",
    "ui.edit": "Editar",
    "ui.settings": "Configuraci\xF3n",
    "ui.download": "Descargar",
    "ui.initiateProcess": "Iniciar Proceso",
    "ui.initiatingProcess": "Iniciando Proceso...",
    "ui.processStarted": "Proceso iniciado",
    "ui.back": "Volver",
    "ui.next": "Siguiente",
    "ui.finish": "Finalizar",
    "ui.close": "Cerrar",
    "ui.configuration": "Configuraci\xF3n",
    "ui.parametersToSend": "Par\xE1metros a enviar:",
    "ui.formParameters": "Par\xE1metros del formulario",
    "ui.hiddenParameters": "Par\xE1metros ocultos/calculados",
    "ui.returnParameters": "Par\xE1metros de Retorno:",
    "ui.processDataInitialized": "Datos del Proceso Inicializado:",
    "ui.processStartedSuccessfully": "Proceso Iniciado Exitosamente",
    "ui.processCreatedSuccessfully": "El proceso ha sido creado correctamente en el BPMS Bizuit",
    "ui.processInformation": "Informaci\xF3n del Proceso:",
    "ui.startAnotherProcess": "Iniciar Otro Proceso",
    "ui.processForm": "Formulario de Proceso:",
    "ui.noInputParametersFound": "No se encontraron par\xE1metros de entrada para este proceso.",
    "ui.eventNameFromUrl": "Nombre del evento recibido desde URL",
    "ui.retry": "Reintentar",
    "ui.loadInstanceData": "Cargar Datos de Instancia",
    "ui.instanceData": "Datos de la Instancia",
    "ui.savingChanges": "Guardando Cambios...",
    "ui.saveAndContinue": "Guardar y Continuar",
    "ui.visibleParameters": "Par\xE1metros Visibles",
    "ui.hiddenCalculatedParameters": "Par\xE1metros Ocultos/Calculados",
    "ui.totalParameters": "Total de Par\xE1metros",
    "ui.sending": "Enviando",
    "ui.enter": "Ingrese",
    "ui.example": "Ejemplo",
    "ui.optional": "opcional",
    "ui.required": "requerido",
    "ui.processName": "Nombre del Proceso",
    "ui.loadProcessParameters": "Cargar Par\xE1metros del Proceso",
    "ui.loadingParameters": "Cargando par\xE1metros...",
    "ui.description": "Descripci\xF3n",
    "ui.useCases": "Casos de Uso",
    "ui.installation": "Instalaci\xF3n",
    "ui.editCodeDescription": "Edita el c\xF3digo y ve los cambios en tiempo real",
    "ui.viewSourceCode": "Ver c\xF3digo fuente de",
    "ui.inYourProject": "en tu proyecto",
    "ui.copy": "Copiar",
    // Example 1 - Dynamic
    "example1.title": "Ejemplo 1: Campos Din\xE1micos",
    "example1.description": "Los campos se generan autom\xE1ticamente desde los par\xE1metros del proceso, se env\xEDan todos los campos",
    "example1.liveCodeTitle": "Editor Interactivo - Generaci\xF3n Din\xE1mica de Campos",
    "example1.liveCodeDescription": "Este c\xF3digo simula c\xF3mo los campos se generan autom\xE1ticamente desde par\xE1metros de la API. Los par\xE1metros est\xE1n hardcodeados para demostraci\xF3n.",
    "example1.howItWorks": "C\xF3mo funciona este ejemplo",
    "example1.step1": "Obtener par\xE1metros din\xE1micamente:",
    "example1.step2": "Generar campos autom\xE1ticamente:",
    "example1.step3": "Send todos los campos + par\xE1metros ocultos:",
    "example1.idealFor": "Ideal para:",
    "example1.idealForText": "Formularios gen\xE9ricos, prototipos r\xE1pidos, cuando no conoces los par\xE1metros de antemano",
    "example1.notIdealFor": "No ideal para:",
    "example1.notIdealForText": "UI personalizada, validaciones complejas, mapeo selectivo de campos",
    // Example 2 - Manual All
    "example2.title": "Ejemplo 2: Campos Manuales + Enviar Todos",
    "example2.description": "Los campos se crean manualmente con control total de la UI, se env\xEDan todos los valores",
    "example2.liveCodeTitle": "Editor Interactivo en Vivo",
    "example2.liveCodeDescription": "Edita el c\xF3digo en el panel izquierdo y ve los cambios EN TIEMPO REAL en el panel derecho. Prueba cambiar los placeholders, agregar campos, modificar estilos, etc.",
    "example2.howItWorks": "C\xF3mo funciona este ejemplo",
    "example2.step1": "Definir campos manualmente:",
    "example2.step2": "Crear inputs con control total de UI:",
    "example2.step3": "Aplicar transformaciones a los valores:",
    "example2.step4": "Agregar par\xE1metros ocultos/calculados:",
    "example2.step5": "Combinar y enviar TODOS los campos:",
    "example2.idealFor": "Ideal para:",
    "example2.idealForText": "Formularios con UI personalizada, validaciones espec\xEDficas, mejor UX",
    "example2.limitation": "Limitaci\xF3n:",
    "example2.limitationText": "Env\xEDa TODOS los campos incluso si algunos no son necesarios para el proceso",
    "example2.seeExample3": "Ver Ejemplo 3",
    "example2.seeExample3Text": "para aprender c\xF3mo enviar solo campos espec\xEDficos",
    // Example 3 - Selective Mapping
    "example3.title": "Ejemplo 3: Campos Manuales + Mapeo Selectivo",
    "example3.description": "Los campos se crean manualmente con control total de la UI, se eligen selectivamente cu\xE1les enviar con transformaciones",
    "example3.liveCodeTitle": "C\xF3digo Interactivo - Mapeo Selectivo",
    "example3.liveCodeDescription": "Edita el c\xF3digo y ve los cambios en tiempo real. Este ejemplo muestra c\xF3mo usar buildParameters() para enviar solo los campos necesarios.",
    "example3.howItWorks": "C\xF3mo funciona el Mapeo Selectivo",
    "example3.step1": "Definir el mapeo de campos:",
    "example3.step2": "Construir par\xE1metros selectivamente:",
    "example3.step3": "Agregar par\xE1metros ocultos/calculados:",
    "example3.step4": "Combinar y enviar al proceso:",
    "example3.note": "Nota: comentariosInternos NO est\xE1 aqu\xED, no se enviar\xE1",
    "example3.onlyGenerates": "Solo genera par\xE1metros para los campos del mapping",
    "example3.notInForm": "Par\xE1metros que NO est\xE1n en el formulario",
    "example3.combine": "Combinar par\xE1metros visibles + ocultos",
    "example3.visibleHidden": "visibles + ocultos = total",
    "example3.advantages.title": "\xBFPor qu\xE9 es la MEJOR PR\xC1CTICA?",
    "example3.advantages.1": "Control total sobre la UI y validaciones",
    "example3.advantages.2": "Env\xEDa SOLO lo necesario (mejor performance)",
    "example3.advantages.3": "Transforma valores antes de enviar (may\xFAsculas, decimales, etc.)",
    "example3.advantages.4": "Mapea campos del formulario a nombres de par\xE1metros diferentes",
    "example3.advantages.5": "Distingue entre par\xE1metros y variables (isVariable)",
    "example3.advantages.6": "Combina campos visibles + par\xE1metros ocultos/calculados",
    // Components Demo - Welcome Screen
    "welcome.title": "Bizuit UI Components",
    "welcome.subtitle": "Una biblioteca completa de componentes React profesionales para construir aplicaciones empresariales modernas",
    "welcome.version": "v1.3.1 \u2022 @tyconsa/bizuit-ui-components",
    "welcome.totalComponents": "Componentes totales",
    "welcome.totalComponentsDesc": "Desde formularios hasta visualizaci\xF3n de datos",
    "welcome.categories": "Categor\xEDas",
    "welcome.categoriesDesc": "UI, Formularios, Layout, Media y Datos",
    "welcome.typescript": "TypeScript",
    "welcome.typescriptDesc": "Tipos completos y autocompletado",
    "welcome.startExploring": "Comienza explorando",
    "welcome.selectComponent": "Selecciona un componente desde la barra lateral para ver:",
    "welcome.detailedDescription": "Descripci\xF3n detallada",
    "welcome.detailedDescriptionText": "y casos de uso",
    "welcome.completeProps": "Documentaci\xF3n completa de props",
    "welcome.completePropsText": "con tipos y valores por defecto",
    "welcome.interactiveExamples": "Ejemplos de c\xF3digo interactivos",
    "welcome.interactiveExamplesText": "que puedes editar en tiempo real",
    "welcome.quickInstall": "Instalaci\xF3n r\xE1pida",
    "welcome.thenImport": "Luego importa los componentes que necesites:",
    // Components Demo - Sidebar
    "sidebar.components": "Componentes",
    "sidebar.componentsAvailable": "componentes disponibles",
    "sidebar.searchPlaceholder": "Buscar componentes...",
    "sidebar.noComponentsFound": "No se encontraron componentes",
    "sidebar.tryDifferentTerm": "Intenta con un t\xE9rmino diferente",
    "sidebar.component": "componente",
    "sidebar.components_plural": "componentes",
    // Components Demo - Categories
    "category.ui": "Componentes UI",
    "category.ui.desc": "Botones, tarjetas y elementos visuales",
    "category.forms": "Componentes de Formulario",
    "category.forms.desc": "Campos de entrada y controles de formulario",
    "category.layout": "Componentes de Layout",
    "category.layout.desc": "Pesta\xF1as, tarjetas y contenedores",
    "category.media": "Componentes de Media",
    "category.media.desc": "Im\xE1genes, videos y reproductores multimedia",
    "category.data": "Componentes de Datos",
    "category.data.desc": "Tablas y visualizaci\xF3n de datos",
    // Components Demo - UI Labels
    "ui.overview": "Vista General",
    "ui.props": "Propiedades",
    "ui.liveExample": "Ejemplo en Vivo",
    "ui.sourceCode": "C\xF3digo Fuente",
    "ui.noPropsDocumented": "No hay propiedades documentadas para este componente.",
    "ui.componentName": "Nombre",
    "ui.componentType": "Tipo",
    "ui.componentRequired": "Requerido",
    "ui.componentDefault": "Por Defecto",
    "ui.componentDescription": "Descripci\xF3n",
    "ui.yes": "S\xED",
    "ui.no": "No"
  }
};

// src/providers/use-translation.tsx
function useTranslation() {
  const { language } = useBizuitTheme();
  const t = (key) => {
    return translations[language][key] || key;
  };
  return { t, language };
}

// src/providers/auth-provider.tsx
import { createContext as createContext2, useContext as useContext2, useState as useState15, useEffect as useEffect11 } from "react";
import { jsx as jsx22 } from "react/jsx-runtime";
var BizuitAuthContext = createContext2(void 0);
var TOKEN_STORAGE_KEY = "bizuit-auth-token";
var USER_STORAGE_KEY = "bizuit-auth-user";
var EXPIRATION_STORAGE_KEY = "bizuit-auth-expiration";
function BizuitAuthProvider({
  children,
  tokenStorageKey = TOKEN_STORAGE_KEY,
  userStorageKey = USER_STORAGE_KEY,
  expirationStorageKey = EXPIRATION_STORAGE_KEY
}) {
  const [token, setToken] = useState15(null);
  const [user, setUser] = useState15(null);
  const [expirationDate, setExpirationDate] = useState15(null);
  const [mounted, setMounted] = useState15(false);
  useEffect11(() => {
    const storedToken = localStorage.getItem(tokenStorageKey);
    const storedUser = localStorage.getItem(userStorageKey);
    const storedExpiration = localStorage.getItem(expirationStorageKey);
    if (storedToken && storedUser && storedExpiration) {
      const expDate = new Date(storedExpiration);
      if (expDate > /* @__PURE__ */ new Date()) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setExpirationDate(storedExpiration);
      } else {
        localStorage.removeItem(tokenStorageKey);
        localStorage.removeItem(userStorageKey);
        localStorage.removeItem(expirationStorageKey);
      }
    }
    setMounted(true);
  }, [tokenStorageKey, userStorageKey, expirationStorageKey]);
  const login = (loginResponse) => {
    const { Token, User, ExpirationDate } = loginResponse;
    console.log("[BizuitAuth] Login successful, saving to state and localStorage:", {
      token: Token?.substring(0, 20) + "...",
      user: User,
      expiration: ExpirationDate
    });
    setToken(Token);
    setUser(User);
    setExpirationDate(ExpirationDate);
    localStorage.setItem(tokenStorageKey, Token);
    localStorage.setItem(userStorageKey, JSON.stringify(User));
    localStorage.setItem(expirationStorageKey, ExpirationDate);
    console.log("[BizuitAuth] State updated, isAuthenticated will be:", true);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    setExpirationDate(null);
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);
    localStorage.removeItem(expirationStorageKey);
  };
  const checkAuth = () => {
    if (!token || !expirationDate) {
      return false;
    }
    const expDate = new Date(expirationDate);
    if (expDate <= /* @__PURE__ */ new Date()) {
      logout();
      return false;
    }
    return true;
  };
  const value = {
    token,
    user,
    expirationDate,
    isAuthenticated: !!token && checkAuth(),
    login,
    logout,
    checkAuth
  };
  if (!mounted) {
    return null;
  }
  return /* @__PURE__ */ jsx22(BizuitAuthContext.Provider, { value, children });
}
function useBizuitAuth() {
  const context = useContext2(BizuitAuthContext);
  if (context === void 0) {
    throw new Error("useBizuitAuth must be used within a BizuitAuthProvider");
  }
  return context;
}

// src/components/BizuitLogin.tsx
import { useState as useState16 } from "react";
import { jsx as jsx23, jsxs as jsxs20 } from "react/jsx-runtime";
function BizuitLogin({
  authService,
  onLoginSuccess,
  onLoginError,
  className = ""
}) {
  const { t } = useTranslation();
  const [username, setUsername] = useState16("");
  const [password, setPassword] = useState16("");
  const [isLoading, setIsLoading] = useState16(false);
  const [error, setError] = useState16(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const loginResponse = await authService.login({ username, password });
      onLoginSuccess(loginResponse);
    } catch (err) {
      const errorMessage = err.message || "Error al iniciar sesi\xF3n";
      setError(errorMessage);
      setIsLoading(false);
      if (onLoginError) {
        onLoginError(err);
      }
    }
  };
  return /* @__PURE__ */ jsx23("div", { className: `w-full max-w-md ${className}`, children: /* @__PURE__ */ jsxs20("div", { className: "bg-card border rounded-lg shadow-lg p-8", children: [
    /* @__PURE__ */ jsx23("h1", { className: "text-2xl font-bold mb-6 text-center", children: t("login.title") }),
    /* @__PURE__ */ jsxs20("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs20("div", { children: [
        /* @__PURE__ */ jsx23("label", { htmlFor: "username", className: "block text-sm font-medium mb-2", children: t("login.username") }),
        /* @__PURE__ */ jsx23(
          "input",
          {
            id: "username",
            type: "text",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            placeholder: t("login.username.placeholder"),
            required: true,
            disabled: isLoading,
            className: "w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 placeholder:text-muted-foreground"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs20("div", { children: [
        /* @__PURE__ */ jsx23("label", { htmlFor: "password", className: "block text-sm font-medium mb-2", children: t("login.password") }),
        /* @__PURE__ */ jsx23(
          "input",
          {
            id: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: t("login.password.placeholder"),
            required: true,
            disabled: isLoading,
            className: "w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 placeholder:text-muted-foreground"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxs20("div", { className: "p-3 bg-destructive/10 border border-destructive/20 rounded-md", children: [
        /* @__PURE__ */ jsx23("p", { className: "text-sm text-destructive font-medium", children: t("login.error") }),
        /* @__PURE__ */ jsx23("p", { className: "text-sm text-destructive mt-1", children: error })
      ] }),
      /* @__PURE__ */ jsx23(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? t("login.submitting") : t("login.submit") })
    ] }),
    /* @__PURE__ */ jsx23("div", { className: "mt-6 p-4 bg-muted/50 rounded-md", children: /* @__PURE__ */ jsxs20("p", { className: "text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx23("strong", { children: t("startProcess.note") }),
      " ",
      t("startProcess.note.description")
    ] }) })
  ] }) });
}

// src/components/process-success-screen.tsx
import { jsx as jsx24, jsxs as jsxs21 } from "react/jsx-runtime";
function ProcessSuccessScreen({
  processData,
  title = "Proceso Iniciado Exitosamente",
  subtitle = "El proceso ha sido creado correctamente en el BPMS Bizuit",
  onNewProcess,
  onBackToHome,
  customActions,
  className = ""
}) {
  return /* @__PURE__ */ jsxs21("div", { className: `border rounded-lg p-6 bg-card text-center ${className}`, children: [
    /* @__PURE__ */ jsx24("div", { className: "w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx24(
      "svg",
      {
        className: "w-8 h-8 text-green-600 dark:text-green-400",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        children: /* @__PURE__ */ jsx24("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })
      }
    ) }),
    /* @__PURE__ */ jsx24("h2", { className: "text-2xl font-bold mb-2", children: title }),
    /* @__PURE__ */ jsx24("p", { className: "text-muted-foreground mb-6", children: subtitle }),
    processData && /* @__PURE__ */ jsxs21("div", { className: "mb-6 p-4 bg-muted rounded-md text-left", children: [
      /* @__PURE__ */ jsx24("p", { className: "text-sm font-medium mb-2", children: "Informaci\xF3n del Proceso:" }),
      /* @__PURE__ */ jsxs21("div", { className: "space-y-2 text-sm", children: [
        processData.instanceId && /* @__PURE__ */ jsxs21("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx24("span", { className: "text-muted-foreground", children: "Instance ID:" }),
          /* @__PURE__ */ jsx24("span", { className: "font-mono text-xs", children: processData.instanceId })
        ] }),
        processData.status && /* @__PURE__ */ jsxs21("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx24("span", { className: "text-muted-foreground", children: "Status:" }),
          /* @__PURE__ */ jsx24("span", { className: "font-semibold", children: processData.status })
        ] }),
        processData.tyconParameters && /* @__PURE__ */ jsxs21("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsx24("p", { className: "text-muted-foreground mb-1", children: "Par\xE1metros de Retorno:" }),
          /* @__PURE__ */ jsx24("pre", { className: "text-xs bg-background p-2 rounded overflow-auto max-h-48", children: JSON.stringify(processData.tyconParameters, null, 2) })
        ] })
      ] })
    ] }),
    customActions ? customActions : /* @__PURE__ */ jsxs21("div", { className: "flex gap-4 justify-center", children: [
      onNewProcess && /* @__PURE__ */ jsx24(Button, { onClick: onNewProcess, children: "Iniciar Otro Proceso" }),
      onBackToHome && /* @__PURE__ */ jsx24(Button, { variant: "outline", onClick: onBackToHome, children: "Volver al Inicio" })
    ] })
  ] });
}

// src/index.ts
var VERSION = "1.3.1";
export {
  BizuitAuthProvider,
  BizuitCard,
  BizuitCombo,
  BizuitDataGrid,
  BizuitDateTimePicker,
  BizuitDocumentInput,
  BizuitFileUpload,
  BizuitGeolocation,
  BizuitIFrame,
  BizuitLogin,
  BizuitMedia,
  BizuitRadioButton,
  BizuitSignature,
  BizuitSlider,
  BizuitStepper,
  BizuitSubForm,
  BizuitTabs,
  BizuitThemeProvider,
  Button,
  ColorThemeSelector,
  DynamicFormField,
  LanguageSelector,
  ProcessSuccessScreen,
  SortableHeader,
  ThemeToggle,
  VERSION,
  cn,
  debounce,
  formatDate,
  formatNumber,
  generateId,
  isMobile,
  isTouchDevice,
  translations,
  useBizuitAuth,
  useBizuitTheme,
  useTranslation
};
//# sourceMappingURL=index.mjs.map