// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'

export const store = configureStore({
  reducer: {
    user,
    calendar,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
