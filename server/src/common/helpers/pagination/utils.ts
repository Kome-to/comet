import { camelCase } from 'lodash';
import { Model, Op, WhereOptions } from 'sequelize';

import { CursorPayload, OrderConfig, PaginationConnection, PaginationParams, PaginationQuery } from './types';

export const parseCursor = (cursor: string): CursorPayload | null => {
  if (!cursor) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
  } catch (e) {
    return null;
  }
};

export const getPrimaryKeyFields = (model: any): string[] => {
  const primaryKeyFields = Object.entries(model.rawAttributes)
    .filter(([, attribute]: any) => {
      return attribute.primaryKey;
    })
    .map(([column]) => {
      return column;
    });

  return primaryKeyFields;
};

const normalizePrimaryKeyField = (primaryKeyField: string | string[]): string[] => {
  return Array.isArray(primaryKeyField) ? primaryKeyField : [primaryKeyField];
};

const ensurePrimaryKeyFieldInOrder = (order: OrderConfig, primaryKeyField: string[]): OrderConfig => {
  const missingPrimaryKeyFields = primaryKeyField.filter((pkField) => {
    return !order.find(([field]) => {
      return field === pkField;
    });
  });

  const primaryKeyOrder: OrderConfig = missingPrimaryKeyFields.map((field) => {
    return [field, 'DESC'];
  });

  return [...order, ...primaryKeyOrder];
};

export const normalizeOrder = (order: any, primaryKeyField: string | string[], omitPrimaryKeyFromOrder: boolean): OrderConfig => {
  const normalizedPrimaryKeyField = normalizePrimaryKeyField(primaryKeyField);

  let normalized: any[] = [];

  if (Array.isArray(order)) {
    normalized = order.map((o) => {
      if (typeof o === 'string') {
        return [o, 'ASC'];
      }

      if (Array.isArray(o)) {
        const [field, direction] = o;

        return [field, direction || 'ASC'];
      }

      return o;
    });
  }

  return omitPrimaryKeyFromOrder ? normalized : ensurePrimaryKeyFieldInOrder(normalized, normalizedPrimaryKeyField);
};

export const reverseOrder = (order: OrderConfig): OrderConfig => {
  return order.map(([field, direction]) => {
    return [field, direction.toLowerCase() === 'desc' ? 'ASC' : 'DESC'];
  });
};

const serializeCursor = (payload: CursorPayload): string => {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

export const createCursor = <ModelType extends Model>(instance: ModelType, order: OrderConfig): string => {
  const payload = order.map(([field]) => {
    return instance.get(camelCase(field));
  });

  return serializeCursor(payload);
};

const isValidCursor = (cursor: CursorPayload, order: OrderConfig): boolean => {
  return cursor.length === order.length;
};

const recursivelyGetPaginationQuery = (order: OrderConfig, cursor: CursorPayload): WhereOptions<any> => {
  const currentOp = order[0][1].toLowerCase() === 'desc' ? Op.lt : Op.gt;

  if (order.length === 1) {
    return {
      [order[0][0]]: {
        [currentOp]: cursor[0],
      },
    };
  }
  return {
    [Op.or]: [
      {
        [order[0][0]]: {
          [currentOp]: cursor[0],
        },
      },
      {
        [order[0][0]]: cursor[0],
        ...recursivelyGetPaginationQuery(order.slice(1), cursor.slice(1)),
      },
    ],
  };
};

export const getPaginationQuery = (order: OrderConfig, cursor: CursorPayload): WhereOptions<any> | null => {
  if (!isValidCursor(cursor, order)) {
    return null;
  }

  return recursivelyGetPaginationQuery(order, cursor);
};

export const getPaginateOptions = (paginationParams: PaginationParams) => {
  const paginateOptions: PaginationQuery = { limit: 40, order: [['created_at', 'DESC']] };

  // Limit options
  if (paginationParams.limit) paginateOptions.limit = paginationParams.limit;

  // Fetch the first limit list after the last result of response
  if (paginationParams.after) paginateOptions.after = paginationParams.after;

  // Fetch the last limit list after the first result of response
  if (paginationParams.before) paginateOptions.before = paginationParams.before;

  // Order
  if (paginationParams.sortBy && paginationParams.sortDirection) {
    paginateOptions.order = [[paginationParams.sortBy, paginationParams.sortDirection]];
  }

  if (paginationParams.order) {
    paginateOptions.order = paginationParams.order;
  }

  return paginateOptions;
};

export const paginationSerializer = <ModelType extends Model>(data: PaginationConnection<ModelType>, serializer: Function) => {
  data.list = data.list.map((instance) => {
    return {
      item: serializer(instance.item),
      cursor: instance.cursor,
    };
  });
  return data;
};
