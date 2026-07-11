export function normalizeEntity(entity) {
    if (!entity) return null;

    return {
        ...entity,

        // Canonical fields
        entity_id: entity.entity_id ?? entity.id,
        display_name: entity.display_name ?? entity.value,
        entity_type: entity.entity_type ?? entity.type,

        // Backward compatibility
        id: entity.id ?? entity.entity_id,
        value: entity.value ?? entity.display_name,
        type: entity.type ?? entity.entity_type
    };
}