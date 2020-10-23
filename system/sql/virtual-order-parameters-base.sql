select
       vop.id                       as id,
       vop.name                     as name,
       vop.value                    as value,
       vop.parent_id                as parent_id,
       vo.symbol                    as symbol,
       vo.sent_environment_id       as order_sent,
       vo.executed_environment_id   as order_executed,
       vo.created                   as created,
       vo.executed                  as executed
from virtual_orders as vo left join
    virtual_order_parameters vop on vo.id = vop.parent_id