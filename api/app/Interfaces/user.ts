export interface UserPayload {
  name: string
  email: string
  cpf: string
  profile: 'userManagment' | 'collaborator' | 'regionalLeader' | 'supervisor' | 'sub' | 'owner'
  branch_id?: any
  matrice_id?: any
  regional_id?: any
  regional_leader_id: any
  tis_r?: number
  bonus?: number
}

export interface UserUpdatePayload {
  id: number
  name: string
  email: string
  cpf: string
  branch_id?: number
  collaborator_id?: number
  regional_id?: number
  regional_leader_id?: number
  supervisor_id?: number
  matrice_id?: number
  managementUser_id?: number
  sub_id: any
  profile: 'userManagment' | 'collaborator' | 'regionalLeader' | 'supervisor' | 'sub' | 'owner'
  tis_r?: number
  bonus?: number
  owner_id?: number
}

export interface UpdateUserProfile {
  name?: string
  email?: string
  cpf?: string
  user_id: number
  newProfile: 'userManagment' | 'collaborator' | 'regionalLeader' | 'supervisor' | 'sub' | 'owner'

  branch_id?: number
  regional_id?: number
  matrice_id?: number
  regional_leader_id?: number
}

export interface PaginationProps {
  page: number
  limit: number
  email?: string
  cpf?: string
  name?: string
  user?: any
}

export interface FilterPaginationProps {
  email?: string
  cpf?: string
  name?: string
  master_name: string
  page: number
  limit: number
}
