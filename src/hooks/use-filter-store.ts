"use client";

import { useState, useEffect } from "react";

interface FilterOptions {
    domain?: string;
    ip?: string;
    port?: string;
}

interface FilterStoreOptions {
    storageKey: string;
    initialState?: FilterOptions;
}

export function useFilterStore({ storageKey, initialState = {} }: FilterStoreOptions) {
    const [filters, setFilters] = useState<FilterOptions>(initialState);
    const [isOpen, setIsOpen] = useState(false);

    // 从 localStorage 加载筛选条件
    useEffect(() => {
        const savedFilters = localStorage.getItem(storageKey);
        if (savedFilters) {
            try {
                setFilters(JSON.parse(savedFilters));
            } catch (e) {
                console.error("Failed to parse saved filters", e);
            }
        }
    }, [storageKey]);

    // 保存筛选条件到 localStorage
    const updateFilters = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        localStorage.setItem(storageKey, JSON.stringify(newFilters));
    };

    // 清除筛选条件
    const clearFilters = () => {
        setFilters({});
        localStorage.removeItem(storageKey);
    };

    // 筛选数据的函数
    const filterData = <T extends Object>(
        data: T[],
        matchers: { [K in keyof FilterOptions]?: (item: T) => boolean }
    ) => {
        return data.filter((item) => {
            // 对每个筛选条件进行检查
            for (const [key, value] of Object.entries(filters)) {
                if (!value) continue;

                const matcherKey = key as keyof FilterOptions;
                const matcher = matchers[matcherKey];

                if (matcher && !matcher(item)) {
                    return false;
                }
            }
            return true;
        });
    };

    return {
        filters,
        updateFilters,
        clearFilters,
        filterData,
        isOpen,
        setIsOpen
    };
}
