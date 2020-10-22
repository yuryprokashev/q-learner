select
       p.id         as id,
       e.id         as parent_id,
       e.symbol     as symbol,
       e.created    as created,
       p.name       as name,
       p.value      as value
from parameters as p left join
    environments as e on e.id = p.parent_id