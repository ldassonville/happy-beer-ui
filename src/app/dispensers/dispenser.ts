export interface Dispenser{

    ref?: string
    beer: string
    size: string
    state?: string
    status?: DispenserStatus

    metadata: Metadata
}

export interface Event {
    
}

export interface Metadata{
    createdAt: Date
    updateAt: Date
    deletedAt: Date
    stolenAt: Date
    fatalAt: Date
}

export interface DispenserStatus {
	status?: string
	reason?: string
}