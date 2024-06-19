import { usePage } from "@inertiajs/react";

export function getQuery(key: string | null = null, fallback: any = null) {
  const { query } = usePage().props.ziggy as { query: Record<string, any> };

  if (key !== null) {
    return query[key] !== undefined ? query[key] : fallback;
  }

  return query;
}

// thank you very much @yaayes on github
//https://github.com/inertiajs/inertia-laravel/issues/174#issuecomment-2150903788
