import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { type Achievement } from '../../types'
import { achievementApi } from '../../services/achievementApi'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Achievement'],
  endpoints: (builder) => ({
    getAchievements: builder.query<Achievement[], void>({
      async queryFn() {
        try {
          const achievements = await achievementApi.fetchAchievements()
          return { data: achievements }
        } catch (error) {
          return { error: error as Error }
        }
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Achievement' as const, id })),
        { type: 'Achievement', id: 'LIST' },
      ],
    }),
    addAchievement: builder.mutation<Achievement, Omit<Achievement, 'id'>>({
      async queryFn(newAchievement) {
        try {
          const result = await achievementApi.addAchievement(newAchievement)
          return { data: result }
        } catch (error) {
          return { error: error as Error }
        }
      },
      invalidatesTags: [{ type: 'Achievement', id: 'LIST' }],
    }),
    updateAchievement: builder.mutation<Achievement, Achievement>({
      async queryFn(updatedAchievement) {
        try {
          const result =
            await achievementApi.updateAchievement(updatedAchievement)
          return { data: result }
        } catch (error) {
          return { error: error as Error }
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Achievement', id: arg.id },
      ],
    }),
    deleteAchievement: builder.mutation<{ id: number }, number>({
      async queryFn(id) {
        try {
          const result = await achievementApi.deleteAchievement(id)
          return { data: result }
        } catch (error) {
          return { error: error as Error }
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Achievement', id }],
    }),
  }),
})

export const {
  useGetAchievementsQuery,
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} = apiSlice
