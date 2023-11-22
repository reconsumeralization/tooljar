```typescript
import { Router } from 'express';
import auditLogsController from '../controllers/auditLogsController';
import workspaceController from '../controllers/workspaceController';
import appController from '../controllers/appController';
import searchController from '../controllers/searchController';
import importExportController from '../controllers/importExportController';
import bulkOperationsController from '../controllers/bulkOperationsController';
import emailController from '../controllers/emailController';
import taskController from '../controllers/taskController';
import accessControlController from '../controllers/accessControlController';
import usageTrackingController from '../controllers/usageTrackingController';
import uiController from '../controllers/uiController';
import collaborationController from '../controllers/collaborationController';
import versionControlController from '../controllers/versionControlController';
import linkGeneratorController from '../controllers/linkGeneratorController';

const router = Router();

router.use('/audit-logs', auditLogsController);
router.use('/workspaces', workspaceController);
router.use('/apps', appController);
router.use('/search', searchController);
router.use('/import-export', importExportController);
router.use('/bulk-operations', bulkOperationsController);
router.use('/email', emailController);
router.use('/tasks', taskController);
router.use('/access-control', accessControlController);
router.use('/usage-tracking', usageTrackingController);
router.use('/ui', uiController);
router.use('/collaboration', collaborationController);
router.use('/version-control', versionControlController);
router.use('/link-generator', linkGeneratorController);

export default router;
```
