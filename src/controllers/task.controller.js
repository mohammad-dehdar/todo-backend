const Task = require('../models/task.model');

exports.getTasks = async (req, res) => {
  try {
    const { user } = req;

    let tasks;
    if (user.role === 'admin' || user.role === 'manager') {
      // مدیر و ادمین همه تسک‌ها را می‌بینند
      tasks = await Task.find().populate('assignedTo createdBy', 'name email role');
    } else {
      // کاربر معمولی فقط تسک‌های خودش را می‌بیند
      tasks = await Task.find({ assignedTo: user.id }).populate('assignedTo createdBy', 'name email role');
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت تسک‌ها', error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
      priority,
      dueDate
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'خطا در ایجاد تسک', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;
    const { user } = req;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'تسک پیدا نشد' });

    // فقط ادمین و مدیر می‌تونن روی هر تسکی تغییر بدن
    // کاربر معمولی فقط اگر خودش assignedTo باشه، می‌تونه وضعیت و کامنت بزاره
    if (user.role === 'employee' && task.assignedTo.toString() !== user.id) {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    // مدیر میتونه وضعیت رو روی done بزاره (تموم کنه تسک)
    if (updates.status === 'done' && user.role === 'employee') {
      return res.status(403).json({ message: 'فقط مدیر می‌تواند تسک را پایان دهد' });
    }

    // اگر کاربر معمولی هست و می‌خواد فقط status یا comments بروز کنه، محدود کن
    if (user.role === 'employee') {
      // اجازه فقط به تغییر status به غیر done یا اضافه کردن کامنت
      if (updates.status && updates.status === 'done') {
        return res.status(403).json({ message: 'فقط مدیر می‌تواند تسک را پایان دهد' });
      }
      // محدود کردن به تغییر فقط وضعیت و کامنت‌ها
      const allowedFields = ['status', 'comments'];
      for (const key of Object.keys(updates)) {
        if (!allowedFields.includes(key)) {
          return res.status(403).json({ message: `فیلد ${key} را نمی‌توانید تغییر دهید` });
        }
      }
    }

    Object.assign(task, updates);
    task.updatedAt = new Date();
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'خطا در بروزرسانی تسک', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { user } = req;

    // فقط ادمین و مدیر اجازه حذف دارند
    if (user.role !== 'admin' && user.role !== 'manager') {
      return res.status(403).json({ message: 'دسترسی غیرمجاز' });
    }

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: 'تسک پیدا نشد' });

    res.json({ message: 'تسک حذف شد' });
  } catch (err) {
    res.status(500).json({ message: 'خطا در حذف تسک', error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { text } = req.body;
    const { user } = req;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'تسک پیدا نشد' });

    task.comments.push({ userId: user.id, text });
    task.updatedAt = new Date();
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'خطا در اضافه کردن کامنت', error: err.message });
  }
};
